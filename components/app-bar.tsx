import { RocketIcon } from "@radix-ui/react-icons";

export default function AppBar() {
  return (
    <header className="max-w-screen-sm mx-auto flex gap-4 items-center p-4">
      <RocketIcon className="w-6 h-6" />
      <div>
        <p className="font-bold font-mono">
          simple chat
          <span className="text-neutral-500 text-sm">{" / langchain"}</span>
        </p>
      </div>
    </header>
  );
}
