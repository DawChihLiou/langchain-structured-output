import { HeartIcon } from "@radix-ui/react-icons";

export default function Footer() {
  return (
    <footer className="max-w-screen-sm mx-auto flex gap-4 items-center px-4 pt-8 pb-2">
      <p className="font-mono text-sm text-neutral-500">
        made with <HeartIcon className="inline" /> by{" "}
        <a
          target="_blank"
          rel="noreferrer noopener"
          href="https://dawchihliou.github.io"
        >
          daw-chih liou
        </a>
      </p>
    </footer>
  );
}
