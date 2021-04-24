## Запуск проекта

- Настроить `.env` файл, указать данные от базы данных (`DB_`), `APP_URL`,`SESSION_DOMAIN`,`SANCTUM_STATEFUL_DOMAINS`
- Открыть `resources/cabinets/.env`, изменить `VUE_APP_URL`, `VUE_APP_HOST`
- Из корневой директории выполнить `composer install`, из `resources/cabinets` -  `npm install && npm run build`
- Из корневой директории после настройки выполнить команду `php artisan install`

По умолчанию после команды `php artisan install` будут созданы несколько пользователей:

- `administratorX@popstop.space`, где Х - цифра от 1 до 2
- `employeeX@popstop.space`, где Х - цифра от 1 до 5 
  
Пароль совпадает с логином, в качестве логина, соответственно, выступает почта. 

Авторизоваться можно на странице https://ddplanet.popstop.space/