import { redis } from "@/lib/redis";

type Message = {
  id: number;
  name: string;
  text: string;
  createdAt: string;
};

const MESSAGES_KEY = "chat:messages";

export async function GET() {
  const rawMessages = await redis.lrange(MESSAGES_KEY, 0, -1);

  const messages = rawMessages.map((message) => JSON.parse(message) as Message);

  return Response.json({ messages });
}

export async function POST(request: Request) {
  const body = (await request.json()) as {
    name?: string;
    text?: string;
  };

  if (!body.name?.trim() || !body.text?.trim()) {
    return Response.json({ error: "Name and text are required" }, { status: 400 });
  }

  const message: Message = {
    id: Date.now(),
    name: body.name.trim(),
    text: body.text.trim(),
    createdAt: new Date().toISOString(),
  };

  await redis.rpush(MESSAGES_KEY, JSON.stringify(message));
  await redis.ltrim(MESSAGES_KEY, -50, -1);

  return Response.json({ message });
}