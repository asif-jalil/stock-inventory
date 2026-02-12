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

### How did you handle the 60-second expiration logic?

When a user creates a reservation, I store it in Postgres with expiresAt = now() + 60s and enqueue a BullMQ delayed job for 60 seconds.

When the job runs, it expires the reservation only if it’s still ACTIVE, then restores the stock and emits a real-time update. If the user has already completed the purchase, the reservation is marked PURCHASED, so the job becomes a no-op.

Postgres is the source of truth. The queue is only used to trigger expiration at the correct time.

It can also be done using Redis, but I avoided it because Redis is memory-based. If Redis data is lost during the 60-second window, the reservation state can disappear and the database can become inconsistent. Since this reservation must be held reliably and reverted if needed, I kept the source of truth in Postgres.

### How did you prevent multiple users from claiming the same last item?

I used a database transaction with pessimistic row locking.

The transaction makes the reservation flow atomic, and the lock ensures the same drop row cannot be updated by another transaction at the same time.

Some architectures use a queue to serialize reservations one-by-one, but in a distributed system multiple queues can introduce complexity and make concurrency harder to manage.
