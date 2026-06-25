# Redisroom

Redisroom is a small Next.js project for learning Redis by building a real-time chat app.

The goal is not to create a complex chat product. The goal is to understand how Redis works by using it as the main data store for practical chat features.

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Redis
- ioredis
- Socket.IO
- Docker
- RedisInsight

## Requirements

- Node.js
- npm
- Docker Desktop

## Getting Started

Install dependencies:

```bash
npm install
```

Start Redis and RedisInsight:

```bash
docker compose up -d
```

Create `.env.local` in the project root:

```env
REDIS_URL=redis://localhost:6379
```

Start the Next.js development server:

```bash
npm run dev
```

Open the app:

```text
http://localhost:3000
```

Open RedisInsight:

```text
http://localhost:5540
```

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Project Structure

```text
redisroom/
  app/
    globals.css
    layout.tsx
    page.tsx
  public/
  docker-compose.yml
  next.config.ts
  package.json
  README.md
  tsconfig.json
```

## Application Plan

Everyone joins one shared chat room. Users only enter a display name.

Planned features:

- Public chat room
- Real-time messaging
- Message history
- Online users
- Typing indicator
- Chat statistics
- Rate limiting

## Redis Learning Roadmap

### 1. Redis Setup

Learn:

- Redis server
- Redis CLI
- RedisInsight
- Docker Compose

### 2. Redis Connection

Learn:

- Connecting Next.js to Redis
- Using ioredis
- Reading `REDIS_URL` from `.env.local`

### 3. Strings

Use for:

- Counters
- Statistics
- Rate limiting

Commands:

- `SET`
- `GET`
- `INCR`
- `DECR`

### 4. Lists

Use for:

- Chat message history

Commands:

- `LPUSH`
- `RPUSH`
- `LRANGE`
- `LTRIM`

### 5. Sets

Use for:

- Online users

Commands:

- `SADD`
- `SREM`
- `SMEMBERS`

### 6. Hashes

Use for:

- User information

Commands:

- `HSET`
- `HGETALL`

### 7. Sorted Sets

Use for:

- Most active users
- Recent activity

Commands:

- `ZADD`
- `ZRANGE`
- `ZREVRANGE`

### 8. TTL

Use for:

- Typing indicators
- Temporary presence data
- Expiring rate limits

Commands:

- `SET EX`
- `EXPIRE`
- `TTL`

### 9. Pub/Sub

Use for:

- Broadcasting chat events
- Real-time updates

Commands:

- `PUBLISH`
- `SUBSCRIBE`

### 10. Transactions and Pipelines

Learn:

- `MULTI`
- `EXEC`
- Pipelined batch operations

## Redis Keys

The app should use simple, readable Redis keys:

```text
chat:messages
chat:online
chat:typing
chat:stats
chat:users
chat:activity
```

## Development Rules

- Keep the project small.
- Build one Redis concept at a time.
- Test Redis operations with Redis CLI or RedisInsight.
- Do not add another database.
- Prefer clear code over abstractions.
- Keep the project rooted directly in `redisroom`.

## Current Progress

- [x] Next.js project created
- [x] Redis dependency installed
- [x] Socket.IO dependency installed
- [x] Docker Compose file added for Redis and RedisInsight
- [x] Project files moved to the `redisroom` root
- [ ] Connect Next.js to Redis
- [ ] Build chat UI
- [ ] Save messages
- [ ] Load message history
- [ ] Track online users
- [ ] Add typing indicator
- [ ] Add statistics
- [ ] Add rate limiting

## Final Goal

By the end of this project, the main outcome should be confidence with Redis data structures and knowing when to use each one in a real application.
