import { Inter as FontSans } from "next/font/google";
import { useState } from "react";

import Navbar from "@/components/ui/navbar";
import { usePings } from "@/hooks/pings";
import { cn } from "@/lib/utils";

import { Button } from "../components/ui/button";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function Home() {
  const [clicked, setClicked] = useState(false);
  const { data, isLoading } = usePings({
    enabled: clicked,
  });

  return (
    <main
      className={cn(
        "m-0 flex min-h-screen flex-col items-center p-0 font-sans",
        fontSans.variable,
      )}
    >
      <div id="header">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Navbar />

          <div
            className=""
            id="inspiring_div"
            style={{ marginTop: "auto", maxWidth: "540px" }}
          >
            <div style={{ fontWeight: "519", fontSize: "2rem" }}>
              Inspiring generations to co-exist
            </div>
            <div style={{ fontSize: "1rem" }}>
              recreation, education, conservation
            </div>
          </div>
        </div>
      </div>
      <h1 className="text-3xl text-primary">Test title</h1>
      <Button onClick={() => setClicked(true)}>
        {isLoading ? "Loading" : "Ping"}
      </Button>
      <p>
        Response from server: <span>{data as string}</span>
      </p>
    </main>
  );
}
