## Запуск проекта
- Настроить `.env` файл, указать данные от базы данных (`DB_`), `APP_URL`,`SESSION_DOMAIN`,`SANCTUM_STATEFUL_DOMAINS`
- Открыть `resources/cabinets/.env`, изменить `VUE_APP_URL`, `VUE_APP_HOST`
- Из корневой директории выполнить `composer install`, из `resources/cabinets` -  `npm install && npm run build`
- Из корневой директории после настройки выполнить команду `php artisan install`
