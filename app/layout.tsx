import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppBar from "@/components/app-bar";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Simple Chat - LangChain",
  description: "A simple chat app powered by LangChain.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-neutral-50`}>
        <AppBar />
        <main
          className="flex flex-col items-center max-w-screen-sm mx-auto gap-4 p-4"
          style={{ minHeight: "calc(100vh - 56px)" }}
        >
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
