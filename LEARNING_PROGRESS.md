# Redisroom Learning Progress

This file is the handoff note for continuing the Redisroom learning project on another system.

## Current Project Status

Project: `redisroom`

Goal: learn Redis by building a simple chat application with Next.js.

Current app state:

- Next.js app runs from the `redisroom` project root.
- Redis runs with Docker Compose.
- RedisInsight runs with Docker Compose.
- Next.js connects to Redis using `ioredis`.
- The chat page can send messages.
- Messages are saved in Redis.
- Messages survive browser refresh.

Current level:

```text
Redis learning progress: about 20-25%
Practical Redis app progress: early working prototype
Current level: beginner to early intermediate
```

## Important Git Status

The latest local commit before this file was:

```text
55146cb Add Redis chat learning progress
```

Push to GitHub failed on this machine because GitHub HTTPS credentials were not available to command-line Git:

```text
fatal: could not read Username for 'https://github.com': Device not configured
```

Before continuing on another machine, push or pull the latest repo after GitHub auth is configured.

Remote:

```text
https://github.com/MITHUNMITS/redisroom.git
```

## Environment Setup

Required tools:

- Node.js
- npm
- Docker Desktop

Start Redis and RedisInsight:

```bash
docker compose up -d
```

Create `.env.local`:

```env
REDIS_URL=redis://localhost:6379
```

Install and run:

```bash
npm install
npm run dev
```

App:

```text
http://localhost:3000
```

RedisInsight:

```text
http://localhost:5540
```

RedisInsight connection from inside Docker:

```text
Host: redis
Port: 6379
Username: leave empty
Password: leave empty
```

## Files Built So Far

```text
lib/redis.ts
app/api/redis-test/route.ts
app/api/messages/route.ts
app/page.tsx
README.md
docker-compose.yml
```

## Completed Steps

### Step 1: Redis Setup

Status: complete

Learned:

- Start Redis with Docker Compose.
- Start RedisInsight with Docker Compose.
- Connect RedisInsight to Redis.
- Test Redis manually with Redis CLI.

Commands learned:

```redis
PING
SET
GET
INCR
```

### Step 2: Connect Next.js To Redis

Status: complete

Files:

```text
lib/redis.ts
app/api/redis-test/route.ts
```

Learned:

- API routes can talk to Redis.
- Browser should not connect directly to Redis.
- Redis connection string is stored in `.env.local`.

Commands used:

```redis
SET app:name redisroom
GET app:name
INCR app:visits
```

### Step 3: Browser To Redis Through Next.js

Status: complete

Learned request flow:

```text
Browser -> Next.js page -> API route -> Redis -> API route -> Browser
```

React concepts learned:

- `useState`
- `setData`
- `loading`
- conditional rendering

### Step 4: Local Chat UI

Status: complete

Learned:

- Build a simple chat screen.
- Store display name in React state.
- Store message input in React state.
- Store messages in browser memory.
- Use `event.preventDefault()` for form submit.

Limitation learned:

- React state disappears after refresh.
- Redis is needed for persistence.

### Step 5: Messages API With Redis List

Status: complete

File:

```text
app/api/messages/route.ts
```

Routes:

```text
GET /api/messages
POST /api/messages
```

Redis key:

```text
chat:messages
```

Commands learned:

```redis
RPUSH chat:messages ...
LRANGE chat:messages 0 -1
LTRIM chat:messages -50 -1
```

Why Redis List:

- Chat messages need order.
- `RPUSH` appends messages.
- `LRANGE` reads history.
- `LTRIM` limits stored history.

### Step 6: Persistent Chat UI

Status: complete

File:

```text
app/page.tsx
```

Learned:

- Load saved messages with `GET /api/messages`.
- Send new messages with `POST /api/messages`.
- Keep React state for rendering.
- Use Redis as the saved message history.

Current flow:

```text
Page load -> GET /api/messages -> LRANGE chat:messages 0 -1 -> render messages
Send message -> POST /api/messages -> RPUSH chat:messages -> LTRIM chat:messages -50 -1 -> update UI
```

## Current Redis Keys

```text
app:name
app:visits
chat:messages
```

Planned keys:

```text
chat:online
chat:typing
chat:stats
chat:users
chat:activity
```

## Exact Next Step

Continue with a small cleanup feature before more advanced Redis structures.

### Next Step: Clear Chat Messages

Redis command:

```redis
DEL chat:messages
```

Add this to `app/api/messages/route.ts`:

```ts
export async function DELETE() {
  await redis.del(MESSAGES_KEY);

  return Response.json({ messages: [] });
}
```

Test:

```bash
curl -X DELETE http://localhost:3000/api/messages
curl http://localhost:3000/api/messages
```

Expected:

```json
{"messages":[]}
```

After that, optionally add a "Clear messages" button in `app/page.tsx`.

## Full Redis Learning Journey Remaining

### 1. Key Deletion And Cleanup

Learn:

- `DEL`
- `EXISTS`
- safe cleanup during development

Use in app:

- clear chat history
- reset counters

### 2. Sets: Online Users

Learn:

- `SADD`
- `SREM`
- `SMEMBERS`
- `SISMEMBER`

Use in app:

- store online users in `chat:online`
- prevent duplicate users

### 3. Hashes: User Profiles

Learn:

- `HSET`
- `HGET`
- `HGETALL`
- `HDEL`

Use in app:

- store user profile data in `chat:users:{name}`
- display user metadata

### 4. Sorted Sets: Activity Ranking

Learn:

- `ZADD`
- `ZINCRBY`
- `ZRANGE`
- `ZREVRANGE`

Use in app:

- track most active users
- rank users by message count
- store recent activity timestamps

### 5. TTL: Temporary Data

Learn:

- `EXPIRE`
- `TTL`
- `SET key value EX seconds`

Use in app:

- typing indicator
- temporary online presence
- expiring rate limit windows

### 6. Rate Limiting

Learn:

- `INCR`
- `EXPIRE`
- request windows

Use in app:

- limit message sending per user
- prevent spam

### 7. Pub/Sub: Real-Time Events

Learn:

- `PUBLISH`
- `SUBSCRIBE`

Use in app:

- broadcast new messages
- broadcast typing events

Important:

- Pub/Sub does not store messages.
- Offline subscribers miss events.

### 8. Transactions

Learn:

- `MULTI`
- `EXEC`

Use in app:

- save message and update stats together
- group related Redis writes

### 9. Pipelines

Learn:

- batch multiple Redis commands
- reduce network round trips

Use in app:

- load messages, stats, online users, and rankings together

### 10. Redis Streams

Learn later:

- event log
- durable message processing
- consumer groups

Use in app later:

- reliable event history
- background processing

## Interview Topics To Learn Later

Must know for full-stack/backend interviews:

- Redis data structures
- TTL
- caching patterns
- rate limiting
- Pub/Sub basics
- persistence basics
- security basics
- avoiding big keys
- why `KEYS *` is dangerous

Strong backend signal:

- eviction policies
- transactions
- pipelines
- Redis Streams
- performance debugging basics

Senior/platform topics:

- Redis Cluster
- Sentinel and high availability
- Lua scripting
- deep RDB/AOF tuning
- production incident debugging

## Interview Questions To Practice

- Why use Redis instead of a database?
- What is TTL?
- How would you build rate limiting?
- How would you store online users?
- How would you cache API results?
- What happens if Redis restarts?
- What is the difference between RDB and AOF?
- What happens when Redis memory is full?
- Why is `KEYS *` dangerous in production?
- How do you avoid storing huge values in one key?
- How would you scale Redis?
- What is Pub/Sub used for?
- When would you use Streams instead of Pub/Sub?

## Current Known Code Note

`app/page.tsx` works and passes lint/build, but the `useEffect` block indentation should be cleaned up later for readability.

Run checks before continuing:

```bash
npm run lint
npm run build
```
