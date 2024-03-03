import { Message } from "ai";

interface BubbleProps {
  message: Message;
  sources?: any[];
}

export default function Bubble({ message, sources }: BubbleProps) {
  return (
    <div className={"flex gap-2 rounded py-2 w-full"}>
      <div>{message.role === "user" ? "🥸" : "🤖"}</div>
      <div>
        <h6 className="mb-1 font-semibold">
          {message.role === "user"
            ? "You"
            : message.role === "assistant"
            ? "GPT"
            : message.role}
        </h6>
        <p>{message.content}</p>
      </div>
    </div>
  );
}
