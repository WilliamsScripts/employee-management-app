# Welcome to Expense management backend 👋

## Getting Started

### Pre-requisites (Tools)

- Node: v18.18.0 above
- PostgreSQL 14 LTS above

### Setting up directly on local machine

This step is most suited to be carried out in a CLI rather rather than a GUI. In this guide, I would be using bash.

- STEP 1: Install all project dependencies by running the `yarn` command in your terminal.

```sh
yarn
```

- STEP 2: Transpile code from ES6 to ES5 using babel

```sh
yarn build
```

- STEP 3: Copy environment variables from .env.example to new .env file, and update the environment with the working values.

```sh
cp .env.example .env
```

- STEP 4: On the first setup, you should create a database to persist data. But first drop database if it exists already.

```sh
yarn db:drop
```

- STEP 5: Now create new database

```sh
yarn db:create
```

- STEP 6: Run migrations to populate database with needed tables.

```sh
yarn db:migrate
```

- STEP 7: There are many modes for initialization, including development, staging, and others. However, development mode is used on default for this guide.

```sh
yarn start:dev
```
