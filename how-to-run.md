# Проект: FitFriends


✨ **FitFriends третья итерация акселератора курса «Фулстек-разработчик #4»  ** ✨
* Студент: [Эдуард Маликов](https://up.htmlacademy.ru/nodejs-2/4/user/2201533).
 
## Запуск проекта

### 1. Контейнеры:

1. Спулить можно по ссылке: https://github.com/Rimich666?tab=packages
   1. fit-friends.users
   2. fit-friends.uploader  
   3. fit-friends.coaching  
   4. fit-friends.notify
   5. fit-friends.bff
   6. fit-friends.frontend

2. Альтернатива: Или создать
   1. Перейти в директорию: `./fit-friend.backend/project`
   2. Сбилдить сервисы:
      1. nx run users:build  
      2. nx run uploader:build 
      3. nx run notify:build
      4. nx run coaching:build
      5. nx run bff:build
   3. Построить docker images
      1. docker build --no-cache --file apps/uploader/Dockerfile --tag fit-friends.uploader:latest .
      2. docker build --no-cache --file apps/users/Dockerfile --tag fit-friends.users:latest .   
      3. docker build --no-cache --file apps/coaching/Dockerfile --tag fit-friends.coaching:latest .
      4. docker build --no-cache --file apps/notify/Dockerfile --tag fit-friends.notify:latest .
      5. docker build --no-cache --file apps/bff/Dockerfile --tag fit-friends.bff:latest .
       
   4. Перейти в директорию: `./fit-friend.frontend/project`
   5. Сбилдить приложение: `npm run build`
   6. Построить docker image: `docker build --file Dockerfile --tag fit-friends.frontend:latest .` 

3. Создать внешние сети:
   1. docker network create fit-friends.rabbit
   2. docker network create fit-friends.bff

4. Создать .env файлы
   1. `./fit-friend.backend/project/apps/uploader/.fit-friends.uploader.env`
      ```dotenv   
      UPLOAD_DIRECTORY_PATH=/opt/fit-friends-uploader/uploads
      PORT=3222
      MONGO_DB_HOST=fit-friend.uploader.mongo
      MONGO_DB_PORT=27017
      MONGO_DB_NAME=fit-friends-uploader
      MONGO_DB_USER=admin
      MONGO_DB_PASSWORD=test
      MONGO_DB_AUTH_BASE=admin
      HOST=localhost
      SERVE_ROOT=/static
      ```
   2. `./fit-friend.backend/project/apps/uploader/.fit-friends.uploader.mongo.env`
      ```dotenv   
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: test
      MONGO_INITDB_DATABASE: fit-friend-uploader
      ```   
   3. `./fit-friend.backend/project/apps/users/.fit-friends.users.env`
      ```dotenv
      PORT=3111
      SALT=TooMuchAllSalted
      MONGO_DB_HOST=fit-friend.users.mongo
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
   4. `./fit-friend.backend/project/apps/users/.fit-friends.users.mongo.env`
      ```dotenv
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: test
      MONGO_INITDB_DATABASE: fit-friend-users
      ```
   5. `./fit-friend.backend/project/apps/coaching/.fit-friends.coaching.env`
      ```dotenv
      PORT=3444
      POSTS_RESPONSE_LIMIT=50
      JWT_SECRET=jwt_secret
      HOST=localhost
      DATABASE_URL=postgres://admin:test@fit-friend.coaching.postgres:5432/fit-friend-coaching
      RABBIT_HOST=fit-friends.notify.rabbitmq
      RABBIT_PASSWORD=test
      RABBIT_PORT=5672
      RABBIT_USER=admin
      RABBIT_BINDING_KEYS=ADD_NOTIFICATION
      ADD_NOTIFICATION=notify.add|fitFriends.notify|add
      ```
   6. `./fit-friend.backend/project/apps/coaching/.fit-friends.coaching.postgres.env`
      ```dotenv
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: test
      POSTGRES_DB: fit-friend-coaching
      ```
   7. `./fit-friend.backend/project/apps/notify/.fit-friends.notify.env`
      ```dotenv
      PORT=3555
      JWT_SECRET=jwt_secret
      MAIL_SMTP_HOST=fit-friends.notify.fakesmtp
      MAIL_SMTP_PORT=8025
      MAIL_USER_NAME=fitFriends
      MAIL_USER_PASSWORD=1
      MAIL_FROM=Fit-friends-notify@fake.ru
      MONGO_DB_HOST=fit-friend.notify.mongo
      MONGO_DB_PORT=27017
      MONGO_DB_NAME=fit-friends-notify
      MONGO_DB_USER=admin
      MONGO_DB_PASSWORD=test 
      MONGO_DB_AUTH_BASE=admin
      RABBIT_HOST=fit-friends.notify.rabbitmq
      RABBIT_PASSWORD=test
      RABBIT_PORT=5672
      RABBIT_USER=admin
      RABBIT_BINDING_KEYS=ADD_NOTIFICATION|SEND_NEWS
      ADD_NOTIFICATION=notify.add|fitFriends.notify|add
      SEND_NEWS=notify.send|fitFriends.notify|send
      ```
   8. `./fit-friend.backend/project/apps/notify/.fit-friends.notify.mongo.env`
      ```dotenv   
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: test
      MONGO_INITDB_DATABASE: fit-friend-notify-mongo
      ```
   9. `./fit-friend.backend/project/apps/notify/.fit-friends.notify.rabbit.env`
      ```dotenv   
      RABBITMQ_DEFAULT_USER: admin
      RABBITMQ_DEFAULT_PASS: test
      ```   
   10. `./fit-friend.backend/project/apps/bff/.fit-friends.bff.env`
      ```dotenv
      PORT=3333
      HTTP_CLIENT_MAX_REDIRECTS=5
      HTTP_CLIENT_TIMEOUT=5000
      APP_USERS=http://fit-friends.users:3111
      APP_COACHING=http://fit-friends.coaching:3444
      APP_FILES=http://fit-friends.uploader:3222
      APP_NOTIFY=http://fit-friends.notify:3555
      RABBIT_HOST=fit-friends.notify.rabbitmq
      RABBIT_PASSWORD=test
      RABBIT_PORT=5672
      RABBIT_USER=admin
      RABBIT_BINDING_KEYS=SEND_NEWS
      SEND_NEWS=notify.send|fitFriends.notify|send
      HOST=localhost
      SERVE_ROOT=/static
      ROOT_PATH=./static
      ```
   11. `./fit-friend.frontend/project/.env`
      ```dotenv
      REACT_APP_BASE_URL=http://localhost:3333
      ```
5. Поднять контейнеры:
   1. Перейти в директорию: `./fit-friend.backend/project`
      1. `docker compose --file ./apps/notify/notify-compose.yml up -d`
      2. `docker compose --file ./apps/uploader/uploader-compose.yml up -d` 
      3. `docker compose --file ./apps/coaching/coaching-compose.yml up -d`  
      4. `docker compose --file ./apps/users/users-compose.yml up -d`  
      5. `docker compose --file ./apps/bff/bff-compose.yml up -d`   
   2. Перейти в директорию: `./fit-friend.frontend/project`
      1. `docker compose --file ./frontend-compose.yml up -d`  

Проект будет доступен на `localhost:5888`

* Всё вышеизложенное справедливо для развёртывания на одном хосте, на отдельных хостах не разворачивал,
 но должно быть всё примерно тоже самое, но .env-ы придётся переписать
* Всё что написано в DESCRIPTION по прежнему справедливо