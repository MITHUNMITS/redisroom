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
    api/
      messages/
        route.ts
      redis-test/
        route.ts
    globals.css
    layout.tsx
    page.tsx
  lib/
    redis.ts
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
app:name
app:visits
chat:messages
chat:online
chat:typing
chat:stats
chat:users
chat:activity
```

Current keys:

- `app:name`: String used to test `SET` and `GET`.
- `app:visits`: String counter used to test `INCR`.
- `chat:messages`: List that stores chat messages as JSON strings.

## Learning Log

### Step 1: Redis Setup

Status: complete

What was done:

- Started Redis with Docker Compose.
- Started RedisInsight with Docker Compose.
- Connected RedisInsight to the Redis container using host `redis` and port `6379`.
- Verified Redis manually with Redis CLI.

Commands learned:

- `PING`
- `SET`
- `GET`
- `INCR`

### Step 2: Next.js Redis Connection

Status: complete

What was done:

- Added `lib/redis.ts`.
- Connected to Redis using `ioredis`.
- Read the Redis connection string from `REDIS_URL`.
- Added `app/api/redis-test/route.ts`.
- Verified that a browser request can write to and read from Redis.

Route:

```text
GET /api/redis-test
```

Redis commands used by this route:

- `SET app:name redisroom`
- `GET app:name`
- `INCR app:visits`

What this proves:

- Next.js can read `.env.local`.
- The API route can connect to Redis.
- Redis can store string values.
- Redis counters can increment atomically.

### Step 3: Browser To Redis Through Next.js

Status: complete

What was done:

- Updated `app/page.tsx`.
- Added a client-side button that calls `GET /api/redis-test`.
- Displayed the Redis connection result in the browser.
- Verified that each button click increments `app:visits`.

Request flow:

```text
Browser -> app/page.tsx -> GET /api/redis-test -> Redis -> JSON response -> Browser
```

React concepts learned:

- `useState` stores values that change on the page.
- `setData` saves the API response.
- `loading` tracks whether the request is running.
- Conditional rendering shows the Redis result only after data exists.

Redis concept learned:

- Redis should stay server-side.
- The browser calls a Next.js API route.
- The API route talks to Redis.

### Step 4: Local Chat UI

Status: complete

What was done:

- Replaced the Redis test UI with a simple chat screen.
- Added a display name input.
- Added a message input.
- Added a local message list.
- Added a form submit handler for sending messages.

React concepts learned:

- `name` stores the display name input.
- `text` stores the current message input.
- `messages` stores the chat messages in browser memory.
- `setMessages` adds a new message to the local list.
- `event.preventDefault()` stops the form from refreshing the page.

Important limitation:

- Messages disappear after refreshing the browser.
- This happens because the messages are only stored in React state.
- The next step is storing messages in Redis using a List.

Next Redis commands:

- `RPUSH chat:messages`
- `LRANGE chat:messages 0 -1`
- `LTRIM chat:messages`

### Step 5: Messages API With Redis List

Status: complete

What was done:

- Added `app/api/messages/route.ts`.
- Added `GET /api/messages` for reading message history.
- Added `POST /api/messages` for saving a new message.
- Stored each message as a JSON string in Redis.
- Limited the saved history to the last 50 messages.

Redis commands learned:

- `RPUSH chat:messages`
- `LRANGE chat:messages 0 -1`
- `LTRIM chat:messages -50 -1`

Why a Redis List:

- Chat messages need to keep order.
- `RPUSH` appends new messages to the end.
- `LRANGE` reads messages back in order.
- `LTRIM` prevents the list from growing forever.

### Step 6: Persistent Chat UI

Status: complete

What was done:

- Updated `app/page.tsx` to load messages from `GET /api/messages`.
- Updated the send form to post messages to `POST /api/messages`.
- Kept React state for rendering the current screen.
- Used Redis as the saved message history.
- Verified that messages remain after refreshing the browser.

Request flow:

```text
Page load -> GET /api/messages -> LRANGE chat:messages 0 -1 -> render messages
Send message -> POST /api/messages -> RPUSH chat:messages -> LTRIM chat:messages -50 -1 -> update UI
```

React concepts learned:

- `useEffect` can load data when the page opens.
- `fetch` can read and write through API routes.
- React state controls what appears on screen.
- Redis stores the durable message history.

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
- [x] Connect Next.js to Redis
- [x] Create Redis test API route
- [x] Build Redis test UI
- [x] Build chat UI
- [x] Save messages
- [x] Load message history
- [ ] Track online users
- [ ] Add typing indicator
- [ ] Add statistics
- [ ] Add rate limiting

## Final Goal

By the end of this project, the main outcome should be confidence with Redis data structures and knowing when to use each one in a real application.
