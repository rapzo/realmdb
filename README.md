# RealMDB

## Pre-requisites

### Yarn

Enables using yarn >= 2

```shell
corepack enable
```

```shell
corepack prepare yarn@stable --activate
```

### Docker

Boots a local mongodb instance with minimum configuration.

```shell
docker-compose up -d database
```

### .env

The `.env` file is very important in the setup process since it wires
everything configuration-wise.

In both packages' root there's a `env.default` which pack a template for a
possible configuration, although there are some changes needed in order to make
it work, specially when running in docker containers.

1. ```shell
   cp packages/<package-name>/.env.default packages/<package-name>/.{env,env.production}
   ```

2. Change the hostnames, such as database and cors to meet the deployed server,
   such as hostnames:

- `DATABASE_URL=mongodb://127.0.0.1:27017/database` to `DATABASE_URL=mongodb://database:27017/database`
- `CLIENT_URL=http://localhost:5173` to `CLIENT_URL=http://localhost:8080`

### Dependencies

Install all projects dependencies.

```shell
yarn
```

## Development

### Running the client-side application

```shell
yarn app:dev
```

or

```shell
yarn workspace @realmdb/app dev
```

### Running the server-side application

```shell
yarn api:dev
```

or

```shell
yarn workspace @realmdb/api dev
```

## Running the production build

```shell
docker-compose up -d
```

The app will be available in `http://localhost:8080`
