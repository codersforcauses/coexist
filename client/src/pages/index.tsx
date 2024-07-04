import { Work_Sans as FontSans } from "next/font/google";
import { useState } from "react";

import Header from "@/components/main/Header";
import { usePings } from "@/hooks/pings";
import { cn } from "@/lib/utils";

import { Button } from "../components/ui/button";

// proof of concept event card display, eventually needs to be converted into tailwind component
// Mostly to show alignments
// TODO: specific stylings including colour, and precise space allignment
// Current Issues: flex-grow not working properly, all columns

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
      <Header />

      {/* Column1, need to figure out  */}
      <div className="w-1/8 order-1 h-full flex-col border border-black p-6 text-primary">
        <div className="order-1 h-1/4 w-1/4 justify-self-start border-b border-gray-300 p-2 font-bold">
          May
        </div>
        <div className="order-2 h-1/2 justify-self-center p-2">01</div>
        <Button className="order-3 h-1/4 justify-self-center p-2">
          Send RSVP
        </Button>
      </div>

      {/* Column2 */}
      <div className="w-5/8 order-2 h-full flex-col border border-black p-6 text-primary">
        <div className="w-5/8 order-1 h-1/4 justify-self-start p-2 font-bold">
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
      <div className="roundedlg order-3 h-full w-1/4 border border-black bg-green-400 p-6"></div>
    </main>
  );
}
