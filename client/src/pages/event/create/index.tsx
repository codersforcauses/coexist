import { Work_Sans as FontSans } from "next/font/google";
import React from "react";

import NewEvent from "@/components/main/newevent/NewEvent";

import { cn } from "../../../lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const new_event: React.FC = () => {
  return <NewEvent />;
};

export default new_event;
