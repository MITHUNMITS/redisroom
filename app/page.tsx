"use client";

import { FormEvent, useEffect, useState } from "react";

type Message = {
  id: number;
  name: string;
  text: string;
  createdAt: string;
};

export default function Home() {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

useEffect(() => {
  let cancelled = false;

  fetch("/api/messages")
    .then((response) => response.json())
    .then((data: { messages: Message[] }) => {
      if (!cancelled) {
        setMessages(data.messages);
      }
    });

  return () => {
    cancelled = true;
  };
}, []);

  async function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim() || !text.trim()) {
      return;
    }

    const response = await fetch("/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        text,
      }),
    });

    const data = (await response.json()) as { message: Message };

    setMessages((currentMessages) => [...currentMessages, data.message]);
    setText("");
  }

  return (
    <main
      style={{ padding: 32, fontFamily: "Arial, sans-serif", maxWidth: 640 }}
    >
      <h1>Redisroom</h1>
      <p>A simple chat app for learning Redis.</p>

      <section style={{ marginTop: 24 }}>
        <label>
          Display name
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Mithun"
            style={{
              display: "block",
              marginTop: 8,
              padding: 8,
              width: "100%",
            }}
          />
        </label>
      </section>

      <section style={{ marginTop: 24 }}>
        <h2>Messages</h2>

        <div style={{ border: "1px solid #ddd", padding: 16, minHeight: 200 }}>
          {messages.length === 0 ? (
            <p>No messages yet.</p>
          ) : (
            messages.map((message) => (
              <div key={message.id} style={{ marginBottom: 12 }}>
                <strong>{message.name}</strong>{" "}
                <span style={{ color: "#666" }}>
                  {new Date(message.createdAt).toLocaleTimeString()}
                </span>
                <div>{message.text}</div>
              </div>
            ))
          )}
        </div>
      </section>

      <form onSubmit={sendMessage} style={{ marginTop: 24 }}>
        <input
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Type a message"
          style={{ padding: 8, width: "75%" }}
        />

        <button type="submit" style={{ padding: 8, marginLeft: 8 }}>
          Send
        </button>
      </form>
    </main>
  );
}
