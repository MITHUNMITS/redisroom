# Redis Open Chat

A minimal real-time chat application built to **learn Redis from scratch**.

The goal of this project is **not** to build another chat application.

The goal is to understand **how Redis works** by building a real application where Redis is the primary database.

---

# Objectives

* Learn Redis by building a practical project.
* Understand every Redis data structure.
* Keep the codebase small and easy to understand.
* Avoid unnecessary abstractions.
* Learn one Redis concept at a time.

---

# Tech Stack

## Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS

## Backend

* Next.js API
* Socket.IO

## Database

* Redis

## Development Tools

* Docker
* RedisInsight

---

# Project Philosophy

This project intentionally avoids:

* PostgreSQL
* MongoDB
* Firebase
* Authentication
* Complex architecture
* Multiple services
* Repository pattern
* Microservices

The focus is Redis.

---

# Application

Everyone joins the same chat room.

Users only enter a display name.

Features include:

* Public chat room
* Real-time messaging
* Online users
* Typing indicator
* Message history
* Statistics
* Rate limiting

---

# Redis Learning Roadmap

## Step 1

Redis Setup

Learn

* Redis Server
* Redis CLI
* RedisInsight

---

## Step 2

Redis Connection

Learn

* Connecting from Next.js
* ioredis
* Environment variables

---

## Step 3

Redis Strings

We'll use Strings for

* Counters
* Statistics
* Rate limiting

Commands

* SET
* GET
* INCR
* DECR

---

## Step 4

Redis Lists

We'll use Lists for

* Chat history

Commands

* LPUSH
* RPUSH
* LRANGE
* LTRIM

---

## Step 5

Redis Sets

We'll use Sets for

* Online users

Commands

* SADD
* SREM
* SMEMBERS

---

## Step 6

Redis Hashes

We'll use Hashes for

* User information

Commands

* HSET
* HGETALL

---

## Step 7

Redis Sorted Sets

We'll use Sorted Sets for

* Most active users
* Recent activity

Commands

* ZADD
* ZRANGE
* ZREVRANGE

---

## Step 8

TTL

We'll use TTL for

* Typing indicator
* Temporary data
* Presence

Commands

* SET EX
* EXPIRE
* TTL

---

## Step 9

Pub/Sub

Learn

* Real-time communication
* Event broadcasting

Commands

* PUBLISH
* SUBSCRIBE

---

## Step 10

Transactions

Learn

* MULTI
* EXEC

---

## Step 11

Pipeline

Learn

* Batch operations
* Performance optimization

---

# Redis Keys

The application will use simple, readable keys.

```
chat:messages
chat:online
chat:typing
chat:stats
chat:users
chat:activity
```

---

# Folder Structure

```
redis-open-chat/

app/
    page.tsx
    layout.tsx
    globals.css

lib/
    redis.ts

server.ts

docker-compose.yml

.env.local

package.json
```

The project intentionally keeps very few files so that learning Redis remains the primary focus.

---

# Development Rules

* Keep the project simple.
* One feature at a time.
* Understand every Redis command before writing code.
* Test every Redis operation using Redis CLI and RedisInsight.
* Do not introduce another database.
* Do not optimize early.
* Prefer clarity over cleverness.

---

# Learning Workflow

For every feature we build, answer four questions:

1. What did the user do?
2. What did Next.js send to Redis?
3. What changed inside Redis?
4. Why did we use this Redis data structure?

---

# Current Learning Progress

* [x] Redis installed
* [x] RedisInsight installed
* [x] Redis CLI tested
* [ ] Connect Next.js to Redis
* [ ] Build chat UI
* [ ] Save messages
* [ ] Load message history
* [ ] Online users
* [ ] Typing indicator
* [ ] Statistics
* [ ] Rate limiting
* [ ] Deployment

---

# Final Goal

By the end of this project, I should understand:

* Redis Strings
* Redis Lists
* Redis Sets
* Redis Hashes
* Redis Sorted Sets
* TTL
* Pub/Sub
* Transactions
* Pipelines

More importantly, I should know **when** to use each feature in a real application.

This project is not about becoming good at chat applications.

It is about becoming confident with Redis.
