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
docker-compose up -d
```

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
