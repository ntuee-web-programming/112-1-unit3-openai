"use client";

import { Message } from "@/utils/types";
import { useState } from "react";
import MessageWrapper from "./_components/MessageWrapper";

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "system",
      content: "Welcome to the chat!",
    },
    {
      role: "assistant",
      content: "Hello, how can I help you today?",
    },
    {
      role: "user",
      content: "I need help with my account.",
    },
    // Add some dummy messages here

    ...Array.from({ length: 10 }, (_, index) => ({
      role: (index % 2 === 0 ? "user" : "assistant") as Message["role"],
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
    })),
    // End of dummy messages
  ]);
  return (
    <main className="flex h-screen overflow-hidden flex-col items-center justify-between">
      <div className="h-full border w-1/3 flex flex-col overflow-hidden">
        <nav className="w-full border-b px-4 py-2 shadow-md">
          <h1 className="font-semibold text-lg">ChatGPT</h1>
        </nav>
        <div className="grow flex flex-col gap-2 p-2 overflow-scroll">
          {messages.map((message, index) => (
            <MessageWrapper key={index} message={message} />
          ))}
        </div>
        <div className="border-t p-2 flex gap-2">
          <input className="grow text-lg bg-gray-100 rounded-lg px-2" />
          <button className="text-lg bg-teal-600 hover:bg-teal-500 text-white px-2 py-1 rounded-lg">
            Send
          </button>
        </div>
      </div>
    </main>
  );
}
