"use client";

import { useChat } from "ai/react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { PaperPlaneIcon, ReloadIcon } from "@radix-ui/react-icons";
import Bubble from "./bubble";

export default function Chat() {
  const { messages, input, isLoading, handleSubmit, handleInputChange } =
    useChat({
      api: "/api/chat",
    });

  const chat = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSubmit(event);
  };

  return (
    <>
      <div className="grow flex flex-col-reverse w-full gap-4">
        {[...messages].reverse().map((m) => {
          return <Bubble key={m.id} message={m} />;
        })}
      </div>
      <form onSubmit={chat} className="flex w-full gap-1 mt-2">
        <Input
          value={input}
          placeholder={"Chat about anything..."}
          onChange={handleInputChange}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <ReloadIcon className="animate-spin" />
          ) : (
            <PaperPlaneIcon />
          )}
        </Button>
      </form>
    </>
  );
}
