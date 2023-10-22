# Проект: FitFriends


✨ **FitFriends первая итерация акселератора курса «Фулстек-разработчик #4»  ** ✨
* Студент: [Эдуард Маликов](https://up.htmlacademy.ru/nodejs-2/4/user/2201533).
* Время затраченное на проект: .
 
## Запуск проекта

### 1. Запуск бэка:

1. Перейти в директорию:
   1. `./fit-friend.backend/project` 

2. Поднять четыре докер контейнера:
   1. `docker compose --file ./apps/uploader/docker-compose.dev.yml`
   2. `docker compose --file ./apps/coaching/docker-compose.dev.yml`
   3. `docker compose --file ./apps/notify/docker-compose.dev.yml`
   4. `docker compose --file ./apps/users/docker-compose.dev.yml`
 
3. Инициировать Prisma-client:
   1. `nx run coaching:db:generate`

4. Сделать миграцию в базу:
   1. `npx prisma migrate dev --name "first migrate" --schema ./libs/models/coaching/prisma/schema.prisma --skip-generate --skip-seed`

5. Запустить пять сервисов:
   1. `nx run bff:serve`
   2. `nx run users:serve`
   3. `nx run coaching:serve`
   4. `nx run uploader:serve`
   5. `nx run notify:serve`

### 2. Если нужны фальшивые данные

1. В файле `./apps/fill-base/.fill.env` надо подправить опции для генератора
   1. Файл выглядит так: 
   ```dotenv
        COACHES=5
        SPORTSMEN=50
        TRAININGS=15
        ORDERS=50
        MAX_ORDER_COUNT=20
        FEEDBACKS=100
    ```
   2. краткое содержание: 
       1. COACHES - количество создаваемых тренеров
       2. SPORTSMEN - количество создаваемых спортсменов
       3. TRAININGS - количество создаваемых тренировок
       4. ORDERS - количество создаваемых заказов
       5. MAX_ORDER_COUNT - максимально количество тренировок в заказе
       6. FEEDBACKS - количество создаваемых отзывов
     
2. Ддя генерации: `nx run fill-base:serve` или сначала сбилдить `nx run fill-base:build`,
    а затем можно запускать `nx run fill-base:fill`    

## Переменные окружения
1. `project/apps/bff/.bff.env`:
    
```dotenv
    PORT=3333
    HTTP_CLIENT_MAX_REDIRECTS=5
    HTTP_CLIENT_TIMEOUT=5000
    APP_USERS=http://localhost:3111
    APP_COACHING=http://localhost:3444
    APP_FILES=http://localhost:3222
    APP_NOTIFY=http://localhost:3555
    RABBIT_HOST=localhost
    RABBIT_PASSWORD=test
    RABBIT_PORT=5672
    RABBIT_USER=admin
    RABBIT_BINDING_KEYS=SEND_NEWS
    SEND_NEWS=notify.send|fitFriends.notify|send
```
2.  `project/apps/notify/.env`

```dotenv
    COMPOSE_PROJECT_NAME=Fit-friends-notify
    PORT=3555
    JWT_SECRET=jwt_secret
    MAIL_SMTP_HOST=localhost
    MAIL_SMTP_PORT=8025
    MAIL_USER_NAME=fitFriends
    MAIL_USER_PASSWORD=1
    MAIL_FROM=Fit-friends-notify@fake.ru
    MONGO_DB_HOST=127.0.0.1
    MONGO_DB_PORT=27019
    MONGO_DB_NAME=fit-friends-notify
    MONGO_DB_USER=admin
    MONGO_DB_PASSWORD=test
    MONGO_DB_AUTH_BASE=admin
    RABBIT_HOST=localhost
    RABBIT_PASSWORD=test
    RABBIT_PORT=5672
    RABBIT_USER=admin
    RABBIT_BINDING_KEYS=ADD_NOTIFICATION|SEND_NEWS
    ADD_NOTIFICATION=notify.add|fitFriends.notify|add
    SEND_NEWS=notify.send|fitFriends.notify|send
```
3.  `project/apps/coaching/.coaching.env`:

```dotenv
    PORT=3444
    POSTS_RESPONSE_LIMIT=50
    JWT_SECRET=jwt_secret
    HOST=localhost
    RABBIT_HOST=localhost
    RABBIT_PASSWORD=test
    RABBIT_PORT=5672
    RABBIT_USER=admin
    RABBIT_BINDING_KEYS=ADD_NOTIFICATION
    ADD_NOTIFICATION=notify.add|fitFriends.notify|add
```
4. `project/apps/coaching/.env`:
```dotenv
    COMPOSE_PROJECT_NAME=Fit-friends-coaching
``` 
5. `project/libs/models/coaching/prisma/.env`:    

```dotenv
    DATABASE_URL=postgres://admin:test@localhost:5433/fit-friend-coaching
```

5.  `project/apps/uploader/.env`:

```dotenv
    COMPOSE_PROJECT_NAME=Fit-friends-uploader
```

6.  `project/apps/uploader/.uploader.env`:

```dotenv
    UPLOAD_DIRECTORY_PATH=E:\HTML_academy\fit-friends\fit-friends.backend\project\apps\uploader\uploads
    PORT=3222
    MONGO_DB_HOST=127.0.0.1
    MONGO_DB_PORT=27018
    MONGO_DB_NAME=fit-friends-uploader
    MONGO_DB_USER=admin
    MONGO_DB_PASSWORD=test
    MONGO_DB_AUTH_BASE=admin
    HOST=localhost
    SERVE_ROOT=/static
```

7.  `project/apps/users/.env`:

```dotenv
    COMPOSE_PROJECT_NAME=Fit-friends-users
```

8.  `project/apps/users/.users.env`:

```dotenv
    PORT=3111
    SALT=TooMuchAllSalted
    MONGO_DB_HOST=127.0.0.1
    MONGO_DB_PORT=27017
    MONGO_DB_NAME=fit-friend-users-mongo
    MONGO_DB_USER=admin
    MONGO_DB_PASSWORD=test
    MONGO_DB_AUTH_BASE=admin
    JWT_SECRET=jwt_secret
    JWT_EXPIRES_IN=15m
    JW_RT_SECRET=jwt_refresh_secret
    JW_RT_EXPIRES_IN=7d
    HOST=localhost
    RABBIT_HOST=localhost
    RABBIT_PASSWORD=test
    RABBIT_PORT=5672
    RABBIT_USER=admin
    RABBIT_BINDING_KEYS=REGISTER_USER
    REGISTER_USER=notify.register|fitFriends.notify|register
```

порт запуска сервиса: `PORT=3111` 

настройки HTTP соединений :

`HTTP_CLIENT_MAX_REDIRECTS=5` - количество попыток соединения
`HTTP_CLIENT_TIMEOUT=5000` - таймаут

URL-ы сервисов:

`APP_USERS=http://localhost:3111`
`APP_COACHING=http://localhost:3444`
`APP_FILES=http://localhost:3222`
`APP_NOTIFY=http://localhost:3555`

Название проекта для докера:

`COMPOSE_PROJECT_NAME=Guitar-shop-notify`

Общие настройки Rabbit:

`RABBIT_HOST=localhost`
`RABBIT_PASSWORD=test`
`RABBIT_PORT=5672`
`RABBIT_USER=admin`

Опции Rabbit очередей:

`RABBIT_BINDING_KEYS=REGISTER_USER`
`REGISTER_USER=notify.register|fitFriends.notify|register`

Настройки FakeSMTP для отправки ~~фальшивых~~ тестовых e-mail:

`MAIL_SMTP_HOST=localhost`
`MAIL_SMTP_PORT=8025`
`MAIL_USER_NAME=fitFriends`
`MAIL_USER_PASSWORD=1`
`MAIL_FROM=Fit-friends-notify@fake.ru`

URI к Postgres:

`DATABASE_URL=postgres://admin:test@localhost:5433/fit-friend-coaching`

Директория куда будут складываться фотографии продукта:

`UPLOAD_DIRECTORY_PATH=E:\HTML_academy\fit-friends\fit-friends.backend\project\apps\uploader\uploads`

Опции для Mongo URI:

`MONGO_DB_HOST=127.0.0.1`
`MONGO_DB_PORT=27017`
`MONGO_DB_NAME=fit-friend-users-mongo`
`MONGO_DB_USER=admin`
`MONGO_DB_PASSWORD=test`
`MONGO_DB_AUTH_BASE=admin`

Опции для раздачи статики 

`HOST=localhost`
`SERVE_ROOT=/static`

Это просто соль для хэша пароля:

`SALT=TooMuchAllSalted`

Опции для JWT токена:

`JWT_SECRET=jwt_secret`
`JWT_EXPIRES_IN=30d`

Опции для refresh JWT токена:

`JW_RT_SECRET=jwt_refresh_secret`
`JW_RT_EXPIRES_IN=7d`
