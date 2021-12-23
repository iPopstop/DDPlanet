Проект был создан в рамках марафона "Вездекод" ВКонтакте. Представляет из себя портал заявок в поддержку.

Попробовать - https://ddplanet.popstop.space/main

## Запуск проекта
- Залить к себе, указать в `root_path` директорию `public`
- Настроить `.env` файл, указать данные от базы данных (`DB_`), `APP_URL`,`SESSION_DOMAIN`,`SANCTUM_STATEFUL_DOMAINS`
- Открыть `resources/cabinets/.env`, изменить `VUE_APP_URL`, `VUE_APP_HOST`
- Из корневой директории выполнить `composer install`, из `resources/cabinets` -  `npm install && npm run build`
- Из корневой директории после настройки выполнить команду `php artisan install`

По умолчанию после команды `php artisan install` будут созданы несколько пользователей:

- `administratorX@popstop.space`, где Х - цифра от 1 до 2
- `employeeX@popstop.space`, где Х - цифра от 1 до 5 
  
Пароль совпадает с логином, в качестве логина, соответственно, выступает почта. 
