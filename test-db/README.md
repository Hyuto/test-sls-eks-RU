# Soal SQL

Jawaban terdapat pada file `soal.sql`

## ENV

```
DB: MYSQL
PLATFORM: WINDOWS (with docker)
```

## Build and Run Container

```bash
$ docker-compose up -d --force-recreate
```

Run `soal.sql`

```bash
$ docker exec -it test-db-database-1 bash # open bash
$ mysql -u root -proot school
$ source ./soal.sql
```
