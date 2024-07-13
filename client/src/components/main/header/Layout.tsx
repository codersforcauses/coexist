import { Work_Sans as FontSans } from "next/font/google";
import { ReactElement } from "react";

import { cn } from "@/lib/utils";

import Header from "../header/Header";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function Layout({ children }: { children: ReactElement }) {
  return (
    <main
      className={cn(
        "m-0 flex min-h-screen flex-col p-0 font-sans",
        fontSans.variable,
      )}
    >
      <Header />
      {children}
    </main>
  );
}
