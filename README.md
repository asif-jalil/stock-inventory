# STOCK INVENTORY API

Provides backend for stock inventory

# Developed by

[Asif](https://asif.pw)

## Technologies

- NodeJS > 18
- PostgreSQL
- Redis

# Development setup

- Clone repository
- Create a `.env` file and copy content from `.env.example`
- Change the variables according to your need
- Run `npm install`
- Run `db:migrate` for migrate all files
- Run `db:seed` only if you need demo users
- Run `npm start` for server and `npm run consumers` for queues

## How to

- Run on local machine : `npm start`
- Build for production : `npm run build`
- Run server on production : `node dist/server.js`
- Run rabbitmq consumers : `node dist/broker/consumers.js`
- Run rabbitmq consumers on local machine: `npm run consumers`
