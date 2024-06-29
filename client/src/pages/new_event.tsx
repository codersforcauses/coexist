import { Work_Sans as FontSans } from "next/font/google";
import React from "react";

import Header from "@/components/main/Header";
import NewEvent from "@/components/main/NewEvent";

import { cn } from "../lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const new_event: React.FC = () => {
  return (
    <main
      className={cn(
        "m-0 flex min-h-screen flex-col items-center p-0 font-sans",
        fontSans.variable,
      )}
    >
      <Header bottomdiv={false} />
      <NewEvent />
    </main>
  );
};

export default new_event;
