import { Inter as FontSans } from "next/font/google";
import { useState } from "react";

import { usePings } from "@/hooks/pings";
import { cn } from "@/lib/utils";

import { Button } from "../components/ui/button";

// proof of concept event card display, eventually needs to be converted into tailwind component
// Mostly to show alignments
// TODO: specific stylings including colour, and precise space allignment

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
        "flex min-h-screen flex-row items-start gap-4 p-24 font-sans",
        fontSans.variable,
      )}
    >
      {/* Column1, need to figure out  */}
      <div className="w-1/8 order-1 flex-col p-6 text-primary">
        <div className="order-1 h-1/4 w-1/4 justify-self-start border-b border-gray-300 p-2">
          May
        </div>
        <div className="order-2 h-1/2 justify-self-center p-2">01</div>
        <Button className="order-3 h-1/4 justify-self-center p-2">
          Send RSVP
        </Button>
      </div>

      {/* Column2 */}
      <div className="w-5/8 order-2 flex-col p-6 text-primary">
        <div className="w-5/8 order-1 h-1/4 justify-self-start p-2">
          Tree Planting & Social Swim
        </div>
        <div className="h-1/8 order-2 flex-row border-b border-gray-300 p-2">
          <Button className="order-1 w-1/4 pr-6">Cairns</Button>
          <div className="order-2 w-1/2"> Glenoma Park, Brinsmead</div>
        </div>
        <div className="h-1/8 order-3 p-2">
          {" "}
          3 Hours of Fun Tree Planting, Music, Swim & Food(Snacks Provided!)
        </div>
        <div className="h-1/8 order-2 p-2">
          {" "}
          Bring: Your Hat, water bottle, sunscreen and swimmers for the fresh
          water creek hangout
        </div>
      </div>

      {/* Column3, To be replaced w image */}
      <div className="order 3 roundedlg w-1/4 bg-green-400 p-6"></div>
    </main>
  );
}
