# Backend

The back-end has been split into multiple containerized microservices. You can run all of them at once using `docker compose`:

```sh
docker compose build
docker compose up -d
```

## Default port numbers

| **Service** | **Port** |
| ----------- | -------- |
| User        | 3001     |
| Questions   | 3002     |
