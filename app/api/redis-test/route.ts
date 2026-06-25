import { redis } from "@/lib/redis";

export async function GET() {
  await redis.set("app:name", "redisroom");

  const name = await redis.get("app:name");
  const visits = await redis.incr("app:visits");

  return Response.json({
    connected: true,
    name,
    visits,
  });
}