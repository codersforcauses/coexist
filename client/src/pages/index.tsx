import { Work_Sans as FontSans } from "next/font/google";
import { useState } from "react";

import Header from "@/components/main/Header";
import { usePings } from "@/hooks/pings";
import { cn } from "@/lib/utils";

import { Button } from "../components/ui/button";
import SignUpModal from "../components/ui/SignUpModal";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function Home() {
  const [clicked, setClicked] = useState(false);
  const { data, isLoading } = usePings({
    enabled: clicked,
  });
  const [isSignUpOpen, setSignUp] = useState(false);

  return (
    <main
      className={cn(
        "m-0 flex min-h-screen flex-col items-center p-0 font-sans",
        fontSans.variable,
      )}
    >
      <Header />

      <h1 className="text-3xl text-primary">Test title</h1>
      <Button onClick={() => setClicked(true)}>
        {isLoading ? "Loading" : "Ping"}
      </Button>
      <p>
        Response from server: <span>{data as string}</span>
      </p>
      <div>
        <Button onClick={() => setSignUp(true)}> Sign up</Button>
        <SignUpModal isOpen={isSignUpOpen} onClose={() => setSignUp(false)} />
      </div>
    </main>
  );
}
