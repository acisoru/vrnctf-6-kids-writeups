# Решение задачи

Для начала можно разобрать приложение с помощью [JADX](https://github.com/skylot/jadx).

После этого смотрим на **AndroidManifest.xml**. Там находим следующие строчки:

```xml
<receiver
    android:name="ru.vsu.p175cs.fifsocial.glance.NewPostWidgetReceiver"
    android:exported="true">
    <intent-filter>
      <action android:name="android.appwidget.action.APPWIDGET_UPDATE"/>
    </intent-filter>
    <meta-data
        android:name="android.appwidget.provider"
        android:resource="@xml/new_post_widget_info"/>
</receiver>
```

Значит, у приложения есть виджет, который можно добавить на главный экран устройства.

Добавляем виджет, заходим по нему на экран создания нового поста (экран логина обходится), жмём кнопку назад, получаем флаг.
