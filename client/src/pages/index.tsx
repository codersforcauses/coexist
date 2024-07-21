import { Work_Sans as FontSans } from "next/font/google";
import { useState } from "react";

import EventCard from "@/components/ui/EventCard_V3";
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
      <div className="m-6">
        <EventCard
          date="2023-04-01"
          startTime="08:00"
          endTime="11:00"
          title="Tree Planting and Social Swim"
          city="Cairns"
          location="Glenoma park, Brinstead"
          description="3 hours of Fun, Tree Planting, Music, Swims & Food (Snacks Provided!)"
          refImageURL="/tempEventImg.jpeg"
          rsvpURL="nil"
        />
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
