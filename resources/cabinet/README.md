# Шаблон

Шаблон для быстрого развёртывания проекта на VUE.JS с использованием VUE-CLI. Готов к использованию в качестве SPA.

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/25786311412b4a6ca730b254ee29405b)](https://www.codacy.com?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=iPopstop/Vue-Template&amp;utm_campaign=Badge_Grade)


## TODO
- Настроить eslint. Проблемы:
    - Vue.filter рекомендует заменить на lodash/filter, хотя это не должно работать
    - Не распознаёт localStorage
    - Не распознаёт process.env


## Оглавление:

* [Что входит в шаблон](#Что-входит-в-шаблон)
* [Настройка окружения](#Настройка-окружения)
* [Хелперы](#Хелперы)
    + [Главный (_helper.js_)](#Главный-helperjs)
    + [Дополнительные](#Дополнительные)
* [Плагины](#Плагины)
* [Локализация](#Локализация)
* [Система API](#Система-API)
    - [Пример](#Пример)
    - [GET запрос без параметров](#GET-запрос-без-параметров)
    - [GET запрос c параметрами](#GET-запрос-c-параметрами)
    - [POST запрос c параметрами](#POST-запрос-c-параметрами)
    - [POST запрос c ID и параметрами](#POST-запрос-c-ID-и-параметрами)
    - [DELETE запрос по ID](#DELETE-запрос-по-ID)

    + [Логика при запросе/ответе](#Логика-при-запросе-ответе)
* [Ассеты](#Ассеты)
* [Маршруты](#Маршруты)
* [Breadcrumbs](#breadcrumbs)
* [Хранилище данных](#Хранилище-данных)
    + [Локальное хранилище](#Локальное-хранилище)
    + [VUEX](#vuex)
    + [Работа с хранилищем в .vue файлах:](#Работа-с-хранилищем-в-vue-файлах)
        - [Вызов действий](#Вызов-действий)
        - [Получение информации](#Получение-информации)
        - [Отслеживание изменений](#Отслеживание-изменений)
* [Уведомления](#Уведомления)
* [Авторизация](#Авторизация)
* [Формы](#Формы)
    + [Уведомления в формах](#Уведомления-в-формах)
    + [Обработка ошибок в формах](#Обработка-ошибок-в-формах)
* [Стандарты и практики:](#Стандарты-и-практики)
    + [Рекомендации](#Рекомендации)
        - [Компоненты](#Компоненты)
        - [Другое](#Другое)
        - [Именование](#Именование)
* [Глобальные примеры](#Глобальные-примеры)
    + [Примеры названий геттеров/действий](#Примеры-названий-геттеров-действий)

[Вернуться к оглавлению](#Оглавление)

## Что входит в шаблон

- Гибкий конфиг окружения (.env)
- Система маршрутов с различными посредниками для проверки пользователя
- Страница ошибок
- Система ассетов
- Система хранилища (VUEX)
- Готовая система API для работы
- Команда для создания .vue страниц/компонентов, store хранилищ, API модулей
- Синхронизация хранилища между вкладками
- Поддержка тёмной/светлой темы (как в зависимости от текущей темы, так и вручную)
- Поддержка широкоэкранного режима (настраиваемо)
- Прелоадер перед загрузкой
- Набор хелперов и плагинов
- Система уведомлений (toastr.js)
- Автоматический вывод нужных сообщений об ошибке/успешном выполнении

[Вернуться к оглавлению](#Оглавление)

## Настройка окружения

Настройка выполняется в файле .env

Параметры с префиксом VUE_APP можно использовать в различных vue компонентах.

Параметры без префикса VUE_APP недоступны самому приложению и используются лишь в различных конфигах

[Вернуться к оглавлению](#Оглавление)

## Хелперы

Хелперы - помощники, к которым можно обращаться из любых файлов Путь: **/src/utils/helpers**

### Главный (_helper.js_)

* Авторизация
* Проверка авторизации
* Настройка уведомлений
* Получение данных пользователя
* Проверка роли
* Проверка доступности возможности
* Сообщение при ошибке доступа
* Вывод сообщения об ошибке
* Генерация случайной строки (например, для пароля)

### Дополнительные

* Форматирование числа сотнями (_formatThousands.js_)

[Вернуться к оглавлению](#Оглавление)

## Плагины

Плагины могут подключать компоненты, могут и добавлять функционал (например, фильтры)
Путь: **/src/utils/plugins**

* ApexCharts (apex.js)
* [Breadcrumbs (breadcrumbs.js)](#Breadcrumbs)
* Config (config.js)
* Диалоговое окно с подтверждением (dialog.js)
* Иконки FeatherIcons (feather.js) - `<feather type="iconName" class="class" />`
* Набор фильтров (filters.js)
  Использование - `{{ param |` **filterName** `}}`:
    * Дата/Время
        * Дата и время (**defDate**)
        * Время (**defTime**)
        * Дата (**defDateWithoutTime**)
        * Разница во времени (только что, 2 мин. назад, час назад) (**agoDate**)
    * Строка в верхний регистр (**upper**)
    * Строка в нижний регистр (**lower**)
    * Каждое слово с большой буквы (**capitalize**)
* Прелоадер (loader.js)
* Проверка значения (например, массива) на пустоту (isEmpty.js). Использование - `isEmpty(param)`
* Красивый селектор (select.js)
* Ярлыки для formDate (shortcuts.js)
* Сортировка (sortby.js)
* Уведомления (toastr.js)
* Валидация форм (veeValidate.js)
* [Локализация](#Локализация) (localization.js)

[Вернуться к оглавлению](#Оглавление)

## Локализация

Вы можете использовать 2 вида локализации:

* **(Не рекомендуется)** Хранить все языковые пакеты в отдельной папке вместе с VUE проектом
* **(Рекомендуется)** Возвращать нужный языковой пакет по API при первой загрузке

Синтаксис одинаковый, варианты ничем не отличаются, за исключением того случая, что по API можно возвращать только
нужную локаль, а также удобнее использовать общие языковые файлы на бэкенде.

Локализацию можно использовать с помощью аргумента v-t, а можно через $t. У v-t лучше производительность, но меньший
функционал по сравнению с $t.

### Использование локализации по API

* В файле .env включить параметр `VUE_APP_LOCALE_FROM_API`
* В файле .env указать маршрут получения локали - `VUE_APP_LOCALE_FROM_API_NAME`, этот же маршрут создать в системе API
* Возвращать информацию в виде json. Пример скрипта (PHP, LARAVEL):

        $strings = Cache::rememberForever('lang.js', function () {
          $lang = 'ru';
          $files   = glob(resource_path(`lang/{$lang}/*.php`));
          $strings = [];
          foreach ($files as $file) {
              $name           = basename($file, '.php');
              $strings[$name] = require $file;
          }
          return $strings;
        });
        $locales = ['ru', 'en'];

        return response()->json('strings' => json_encode($strings), 'locales' => $locales);

Где strings - массив объектов (каждый файл - отдельный объект), locales - доступные локали.

### Использование локализации из файлов

* В файле .env выключить параметр `VUE_APP_LOCALE_FROM_API`
* В директории src/locales создать файлы для каждой локали - "название.json". Например, ru.json
* Заполнить файлы данными в json формате (объект, внутри которого ключ-название)

## Система API

Все файлы с запросами хранятся в директории src/api/modules

Каждый файл - отдельный модуль.

Названия модулей начинаются с нижнего подчёркивания, модули подключаются в файле index.js

Каждая ссылка в модуле добавляется по следующему шаблону:

`const linkName = (params) => api({ method: 'method', url: 'url', })`

Если параметры не нужны, указывать **пустые** скобки.

Взаимодействовать с API рекомендуется только через STORE в **actions.js** файлах

#### Пример

#### GET запрос без параметров

`const getWithoutParams = () => api({ method: 'get', url: 'admin/dashboard', })`

#### GET запрос c параметрами

`const getWithParams = params => api({ method: 'get', url: 'admin/dashboard', params })`

#### POST запрос c параметрами

`const postWithParams = data => api({ method: 'post', url: 'admin/dashboard', data })`

#### POST запрос c ID и параметрами

Заменить одинарные кавычки в url - ' - на апострофы

`const postWithIdAndParams = ({id, ...data}) => api({ method: 'post', url: 'admin/${id}', data })`

#### DELETE запрос по ID

Заменить одинарные кавычки в url - ' - на апострофы

``const deleteById = (id) => api({ method: 'delete', url: 'admin/${id}', })``

### Логика при запросе/ответе

Иногда требуется сделать что-то перед запросом/после запроса. Для этого нужны интерцепторы.

Если нужно добавить какой-то параметр по умолчанию для всех запросов, отредактировать src/api/api.js следующим образом:

`send.interceptors.response.use` - задействует какую-то логику при ответе

`send.interceptors.request.use` - задействует какую-то логику при запросе

Для чего:

        axios.get("/city-list", { parse: true });
 
        axios.interceptors.response.use((response) => {
            if (response.config.parse) {
                // Выполнить какой-то код если параметр parse === true
            }
        return response;
        }, (error) => {
            return Promise.reject(error);
        });

Можно также в интерцепторы добавить loader, но тогда надо ограничивать маршруты, т.к. он не всегда нужен

[Вернуться к оглавлению](#Оглавление)

## Ассеты

Все ассеты хранятся в директории src/assets

Ассеты - дополнительные файлы, необходимые для работы. Как правило, туда входят стили, картинки и шрифты.

[Вернуться к оглавлению](#Оглавление)

## Маршруты

Все маршруты хранятся в файле src/router.js

Дополнительная информация по маршрутам находится в этом же файле.

[Вернуться к оглавлению](#Оглавление)

## Breadcrumbs

Breadcrumbs - хлебные крошки. Проще говоря, это навигация. Поскольку в проекте используется vue-router, то навигация
настраивается вместе с маршрутами:

Использование:

* Подключить плагин _breadcrumbs.js
* В шаблон вывести `<Breadcrumbs/>`
* Настроить meta

Пример:

Обычные крошки:

        {
            path: '/parent',
            component: { template: '<router-view/>' },
            meta: {
                breadcrumb: {
                    label: 'Parent to Params',
                    parent: 'Params'
                }
            },
        }

Динамические названия:

        {
            name: 'dynamic-parent',
            path: '/dynamic-parent',
            component: { template: '<h2>Dynamic Parent</h2>' },
            meta: {
                breadcrumb() {
                    const { name } = this.$route; // Получаем имя маршрута (в данном случае dynamic-parent) как переменную
                    return {
                      label: name,
                      parent: 'settings'
                    };
                }
            }
        }

Допустимо также использовать Breadcrumb в Children маршрутах.

[Вернуться к оглавлению](#Оглавление)

## Хранилище данных

### Локальное хранилище

Локальное хранилище - браузер пользователя.

Такое хранилище **не приветствует** использование boolean, поэтому стоит хранить true/false.

В данном хранилище можно использовать те данные, которые нет смысла хранить на бэкенде, и для которых vuex хранилище не
подходит.

Подходит, например, для хранения информации о теме пользователя (хотя можно хранить и на бэкенде, чтобы потом загружать
в vuex, если хочется).

Доступ:

* Рекомендуется
    * `localStorage.key` - получить значение key
    * `localStorage.key = value` - сохранить значение key
* Не рекомендуется
    * `localStorage.getItem('key')` - получить значение key
    * `localStorage.setItem('key', value)` - сохранить значение key

### VUEX

Все файлы хранилища хранятся в директории src/store

Хранилище - это то место, откуда получаются и где хранятся данные, а также где происходит основная работа с данными.

Хранилище взаимодействует с бэкендом по API, используется модульная система. Каждый модуль - отдельная папка.

Структура:

* modulename
    * actions.js

      Сами действия - Вход, выход, установка конфигурации и т.д.

      Могут как взаимодействовать с API, так и задействовать какую-то логику без этого.

      Вызываются с помощью `this.$store.dispatch('modulename/actionName')`

      Пример:

      Действие для выхода пользователя

            logout({dispatch}) { 
                API.auth.logout().then(() => { 
                    dispatch('resetAuthUserDetail'); resolve()
                }).catch(err => reject(err))
            }
      Здесь используется dispatch, т.к. из одного действия надо вызывать другое.

      Иногда требуется вызвать действие в .vue файле, а затем сделать что-то именно в этом же компоненте. В этом поможет
      такая конструкция:

      `logout({dispatch}) { return new Promise((resolve, reject) => { API.auth.logout().then(() => { dispatch('resetAuthUserDetail'); resolve()}).catch(err => reject(err))})}`

      Таким образом можно будет
      использовать `this.$store.dispatch('modulename/actionName').then(() => {/* Логика */}).catch(err => /* Логика */)`

      При этом в then будет передано то, что находится в resolve. В данном случае - ничего, поэтому пусто. В catch будет
      передано то, что находится в reject.

      Подобная конструкция нежелательна, по возможности стоит выполнять как можно больше кода в хранилище.
    * getters.js

      Получение данных/получение обработанных данных (как computed, но только в хранилище).

      Вызываются через ...mapGetters или с помощью `this.$store.getters('modulename/getterName')[params]`

      Пример:

      `getAuthUser: (state) => (name) => { return state.auth[name]; }` - возвращает указанный ключ из информации о
      пользователе. Например, чтобы получить имя пользователя,
      вызовем `this.$store.getters('modulename/getterName')['name']`

      Часто используемые геттеры стоит подключать как плагины.

      Пример:

      `Vue.prototype.auth = store.getters['config/getAuthUser']` - позволяет использовать $auth в компонентах. Чтобы
      передать параметры - нужно указывать их в скобках: **$auth('paramName')**

      `window.auth = store.getters['config/getAuthUser']` - то же самое, только с window.auth

    * index.js (не стоит трогать)
    * initialState.js

      Начальное состояние. Здесь указываются все стейты, которые будут храниться, а также их значения по умолчанию.
    * mutations.js

      Мутации - взаимодействие с данными.

      Именно здесь меняется состояние стейтов.

      Вызываются с помощью `commit('mutationName', payload)`. Payload необязателен, зависит от логики.

      Обычно используются лишь в actions.js

      Пример:

      Обычный коммит, который загружает информацию

      `settings(state, payload) { state.settings = { ...state.settings, ...payload } }`

      Коммит, который сбрасывает часть хранилища (в данном примере - settings) до начального (initialState)

      `clear() { state.config.settings = initialState()['settings'] }`

      Коммит, который сбрасывает состояние хранилища до начального (initialState). Исключение, он единственный должен
      иметь доступ к this

      `clear() { this.state.config = initialState() }`

### Работа с хранилищем в .vue файлах:

#### Вызов действий

`functionName() { this.$store.dispatch('moduleName/actionName', payload)}`

#### Получение информации

`import { mapState } from 'vuex'`

`computed: { ...mapState('moduleName', [
'state1', 'state2', 'state3'
])
}
` - такие стейты будут доступны с помощью this - this.state1, this.state2, this.state3

#### Отслеживание изменений

`watch: {'$store.state.moduleName.state1': { handler() { /* Функция */ }, } },`

[Вернуться к оглавлению](#Оглавление)

## Уведомления

По умолчанию используется плагин toastr. Его нужно импортировать, затем настроить .env файл:

`VUE_APP_FORM_NOTIFICATIONS=true` - Система уведомлений для [форм](#Формы).

`TOASTR_DURATION=2600` - Длительность уведомления в миллисекундах.

`TOASTR_PREVENT_DUPLICATES=true` - Группировка одинаковые уведомлений.

`TOASTR_PROGRESS_BAR=true` - Показывать прогресс-бар.

`TOASTR_NEWEST_ON_TOP=false` - Показывать новые уведомления сверху/снизу.

`TOASTR_POSITION='bottom-right'` - Позиция: `bottom-right`, `bottom-left`, `bottom-center`, `top-right`, `top-left`
, `top-center`.

[Вернуться к оглавлению](#Оглавление)

## Авторизация

Для подключения готовой авторизации нужно создать API на бэкенде, а затем создать модуль api - **auth**.

После создания API изменить config/initialState.js под себя

Информация о запросах:

- **Login** (авторизация) - POST запрос

  Отправляет поля name и password

  На выход должен вернуть
    * user (object) - информация о пользователе


- **Logout** (выход) - POST запрос
    * Желательно вернуть message - сообщение (если включена система уведомлений)


- **Check** (проверка) - POST запрос

  В теле пусто, проверяет авторизацию по токену

  На выход должен вернуть
    * authenticated (boolean) - статус авторизации,
    * config (object) - информация о конфигурации (необязательно, но желательно)

При использовании Laravel Sanctum, при загрузке страницы авторизации, нужно сначала вызвать **this.$store.dispatch('
config/cookies')**

[Вернуться к оглавлению](#Оглавление)

## Формы

### Уведомления в формах

* На запросы возвращать успешный ответ со следующей структурой:
    * status: 'success'
    * message: 'сообщение'
* В файле .env указать `VUE_APP_FORM_NOTIFICATIONS=true`

Приведённая выше конструкция всегда будет возвращать зелёную плашку "success".

Для указания других типов увдомлений добавить в ответ: `notification: 'type'`, где type может быть:

* **warning** - жёлтый цвет, предупреждение
* **error** - красный цвет, ошибка
* **info** - голубой цвет, информация
* **success** - зелёный цвет, успешный ответ (по умолчанию)

### Обработка ошибок в формах

* На запросы возвращать ошибки со следующей структурой:
    * message - сообщение (необязательно)
    * errors - объект с ошибками, который содержит:
        * Название поля
            * Массив с ошибками
        * state - название формы

  Например, для формы авторизации loginForm:

      message: "Неверные данные"
      errors: {
            email: ["Неверное имя пользователя или пароль."],
            state: ["loginForm"]
      }
* В файле .env указать `VUE_APP_FORM_ERRORS=true`
* Создать хранилище для форм или подключить готовое (**forms**)
* Указать `VUE_APP_FORM_STORE`, где значением будет название модуля хранилища
* Добавить объекты форм в initialState.js модуля. В каждый объект добавить `errors: {}`

Ошибки будут записываться в объект errors формы при наличии "errors" в ответе соответственно.

Для вывода ошибок в шаблоне подключить плагин _showError.js, а в шаблоне использовать:

        <show-error
            :form.sync="formName"
            prop="name"
        />

Где formName - название объекта хранилища, а name - название поля, в котором произошла ошибка.

Для сброса формы в первоначальное состояние (обнуления) использовать this.$store.dispatch('forms/clearForm', name)

[Вернуться к оглавлению](#Оглавление)

## Стандарты и практики:

Если редактор ругается на папку **plop** - её нужно добавить в исключения.

Для удобства можно создавать файлы с помощью команды **npm run new {type} {name}**. Параметры в фигурных скобках
необязательны, можно отправить команду и без них, а затем уже выбрать что надо.

Созданные через **npm run new** файлы всё равно нужно импортировать отдельно

Страницы: vue - src/pages/dashCase/Index.vue, scss - src/assets/styles/pages/camelCase/index.scss

Хранилище: src/store/camelCase

API: src/api/modules/_camelCase.js

### Рекомендации

#### Компоненты

* Использовать слоты в переиспользуемых компонентах
* Упрощать код с помощью vuex и mapState, mapGetters, mapMutations, mapActions
* Использовать переменную $cfg
* Именовать коммиты. Например, "<тип>(<направление>): тема" ("docs(changelog): update changelog to beta.5")
* Проверять правильность данных, передаваемых в props:

      props: {
          // Обычная валидация
          score: Number,
          // Комплексная валидация
          score: {
              type: Number,
              default: 100,
              required: true
          }
      }
* Использовать :key в цикле (v-for)
* Не использовать v-if на том же элементе, что и v-for:

  Не стоит:

        <div
            v-for='product in products'
            v-if='product.price < 500'
        >

  Допускается:

        <div
            v-for='product in products'
        >
            <div v-if='product.price < 500'>
                {{ product }}
            </div>
        </div>

  Рекомендуется:

        computed: {
            cheapProducts: () => {
                return this.products.filter(function (product) {
                    return product.price < 100
                })
            }
        }
* Использовать сокращения
    * @ для v-on:
    * : для v-bind
    * \# для v-slot
* Если при создании компонента нужно запустить функцию, которая затем будет запускаться watcher'ом, использовать только
  watcher:

      watch () {
          property {
              immediate: true // - Запуск при создании
              handler() {
                this.functionName()
              }
          }
      }
* В фигурных скобках использовать как можно меньше дефолтного кода, всю остальную логику выводить в computed или
  methods:

  Не стоит:

      {{
          fullName.split(' ').map(function (word) {
          return word[0].toUpperCase() + word.slice(1)
          }).join(' ')
      }}

  Рекомендуется:

        {{ normalizedFullName }}
        computed: {
            normalizedFullName: function () {
                return this.fullName.split(' ').map(function (word) {
                    return word[0].toUpperCase() + word.slice(1)
                }).join(' ')
            }
        }

#### Другое

* **Vuex должен быть предпочтительным способом для глобального управления состоянием**
* Оставить прелоадер в проекте если требуется SPA или SPA-подобный проект.
* В директории страницы стоит хранить не только Index.vue, а весь CRUD набор (Index.vue, Show.vue, Create.vue,
  Update.vue), за исключением тех случаев, когда это не требуется.
* Если что-то используется много раз, стоит сделать это компонентом.
* Если компонент будет использоваться на разных страницах в разных директориях (например, в директория Users и Stats),
  следует создавать его в директории src/components.
* Если компонент будет использоваться на страницах из одной директории (например, Users), его стоит создать в директории
  src/pages/pageModule/components.
* Стили компонентов следует размещать в директории src/assets/styles/components, шрифты - src/assets/fonts, картинки -
  src/assets/images, основные стили - src/assets/styles.
* Общие элементы для каждой страницы (например, шапка, контейнер и футер) стоит создавать в директории src/layouts и
  присваивать маршрутам (router.js) в качестве **component**.
* Использовать систему API только (!) в директории src/store.
* Если нужно запустить DEV сервер под HTTPS, настроить в файле .env параметры: **VUE_APP_HTTPS, HTTPS_KEY_PATH,
  HTTPS_CRT_PATH**.
* Работать с хранилищем из VUE файлов. Для этого:
    * Получать данные с помощью computed:

      `import {mapState} from 'vuex'`

      `computed: { ...mapState('moduleName', ['stateName']) }`

    * Взаимодействовать с данными с помощью dispatch:

      `this.$store.dispatch('moduleName/actionName', params)`
    * Придерживаться практики - тонкие .vue файлы, толстые компоненты хранилища.

  При работе с данными стоит оставлять как можно меньше кода в части **script** в **.vue** файлах. Исключение - прочие
  computed свойства и какая-либо другая логика.
* Если многие объекты хранятся в различных модулях, но имеют один и тот же смысл, их стоит вывести в отдельный модуль
  или присвоить им одинаковый ключ. Например, форма поиска - можно искать посты, авторов, комментарии - всё это
  предназначено для поиска, соответственно в каждом модуле лучше назвать стейт как search ИЛИ создать модуль search (
  рекомендуется)

#### Именование

Что | Правило | Принято | Не принято
------------ | ------------- | ------------- | -------------
Маршруты | мн. ч. | articles/1 | ~~article/1~~
Имена маршрутов | snake_case | users.show_active | ~~users.show-active, show-active-users~~
Столбец в таблице | snake_case без имени модели | meta_title | ~~MetaTitle; article_meta_title~~
Индексы в конфиге и языковых файлах | snake_case | articles_enabled | ~~ArticlesEnabled; articles-enabled~~
Переменные | camelCase | $articlesWithAuthor | ~~$articles_with_author~~
События | kebab-case | open-window | ~~open_windowr~~
Свойства | kebab-case | icon-name | ~~icon_name~~

[Вернуться к оглавлению](#Оглавление)

## Глобальные примеры

### Примеры названий геттеров/действий

Название | Название | Название |
------------ | ------------- | ------------- |
flushFromWaitingRoomEvent | userOpenFilterPanel | putEventToWaitingRoom
productsShown | userSetSelectedValues | bannerParamsChanged
sendEventAddToCart | userToggleCollapse | closeFilterPanel
sendEventAddToCompare | userToggleCollection | clearAllCollapsedFilters
sendEventApplyFilter | userToggleOpenFilter | clearAllSelectedValues
sendEventChangeSort | userToggleSelectedValue | clearSelectedValues
sendEventChangeView | userToggleTheme | resetUserOpenedFilters
sendEventClearAllFilters | loadAllBanners | saveSnapshot
sendEventLoadPage | loadBannerGuide | toggleCollapse
sendImmediatelyOrWait | loadBannerHeader | toggleSelectedValue
_fetchData | loadBannersStretch | initializedComplete
_fetchListing | loadStretchBanner | initializedStart
_fetchListingWithPageReset | sendEventBannerClick | makeHistoryControlled
_fetchPreview | sendEventBannerLoaded | makeHistoryUncontrolled
_getListingFromHtml | sendEventChangeBannerPage | openFilterPanel
_goToPage | updateListingParams | pageLoaded
_handleListing | addToCart | rollbackSnapshot
_interruptTransaction | fetchCart | saveSnapshot
_loadPageEvent | mutateCart | startLoading
_notifyUserChangedFilter | removeFromCart | stopLoading
_notifyUserClearedFilter | addToComparison | mutateCart
_rollbackTransaction | fetchComparison | resetErrorMessage
_saveInHistory | mutateComparison | startLoading
_startTransaction | removeFromComparison | stopLoading
_submitTransaction | getPersonalData | resetErrorMessage
_updateBannersParams | login | startLoading
clearAll | logout | stopLoading
rollback | goToCart | userAddedToComparison
toggleCollection | gtmEvent | allDataLoaded
toggleOpenFilter | gtmGoToCart | resetCustomer
init | gtmGoToShop | startLoading
restoreFromHistory | logout | stopLoading
userChangeItemsSort | showProductEvent | addBaseData
userChangeItemsView | triggerZeroEvent | addBonusRubles
userChangePage | logout | addCredits
userClearAllSelectedValues | load | addDeliveries
userClearSelectedValues | loadProducts | addLabels
userCloseFilterPanelWithApply | loadProperty | addPrices
userCloseFilterPanelWithUndo | UnfetchWishList | addProductsStatuses
cleanWaitingRoom | productLoaded |

[Вернуться к оглавлению](#Оглавление)
