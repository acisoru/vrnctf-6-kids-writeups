<?php
header('X-Proxy: Jinx The Cat');
?>
<html>

<head>
    <title>Приют св. Кафифа</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>

<body class="bg-slate-800 text-white flex flex-col items-center mt-8">
    <div class="flex items-center gap-4">
        <img src="/img/kafif.jpg" class="w-24 h-24 rounded-full" />
        <div>
            <h1 class="text-3xl">Приют св. Кафифа</h1>
            <p>Ваши питомцы скажут вам спасибо</p>
        </div>
    </div>

    <div class="flex flex-col items-center mt-16">
        <h2 class="text-xl">Сейчас мы подберем вам питомца! Кого хотите?</h2>
        <div class="flex mt-2 gap-4 mb-8">
            <a href="/?view=cat" class="px-8 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl text-lg">Кошку</a>
            <a href="/?view=dog" class="px-8 py-2 bg-green-600 hover:bg-green-700 rounded-xl text-lg">Собаку</a>
        </div>
        <?php
            function containsStr($str, $substr) {
                return strpos($str, $substr) !== false;
            }
            if(isset($_GET['view'])) {
                if(containsStr($_GET['view'], 'dog') || containsStr($_GET['view'], 'cat')) {
                    echo '🎉Спасибо за выбор! Чтобы забрать вашего нового члена семьи, позвоните нам по телефону: 8-800-555-35-35<br/>';
                    include $_GET['view'] . '.php';
                } else {
                    echo '🤔 Мы не нашли вам питомца... Поищите собак или кошек';
                }
            }
        ?>
    </div>
</body>

</html>