## Description

Article service.

## Project setup

```shell
  npm ci
```
Set environment
```plain text
# .env example
APP_PORT=4000
NODE_ENV=development
AUTH_PASSWORD_KEY=SECRET_AUTH_PASSWORD_KEY
AUTH_ACCESS_TOKEN_KEY=SECRET_AUTH_ACCESS_TOKEN_KEY
AUTH_REFRESH_TOKEN_KEY=SECRET_AUTH_REFRESH_TOKEN_KEY

POSTGRES_HOST=127.0.0.1
POSTGRES_PORT=5433
POSTGRES_PASSWORD=root
POSTGRES_USERNAME=user
POSTGRES_DATABASE=article_service
ADMINER_PORT=8081

REDIS_PORT=6380
REDIS_PASSWORD=redis
REDIS_HOST=127.0.0.1
REDIS_USERNAME=default
REDIS_TTL='5m'
```


## Compile and run the project

```shell
# services
docker-compose -f .\docker-compose.dev.yaml up -d
# start app (development mode)
npm run start:dev
# migration run
npm run migration:run
```
API documentation: 
```shell
# Swagger UI
http://<your_host>:<your_port>/documentation
```


## Run tests

```shell
# unit tests
npm run test
```

## Migrations
Create:
```shell 
   typeorm migration:create ./migrations/<migration_name>
```
Run:
```shell
npm run migration:run
```
Revert:
```shell
npm run migration:revert
```

## Start with Docker
Set services environment for Docker, default port and container name as host, example:
```plain text
POSTGRES_HOST=articles_postgres
POSTGRES_PORT=5432
REDIS_PORT=6379
REDIS_HOST=articles_redis
```
Building and launching the application and services:

```shell
docker-compose up -d
```
