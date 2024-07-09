import { Work_Sans as FontSans } from "next/font/google";
import { useState } from "react";

import Header from "@/components/main/Header";
import { usePings } from "@/hooks/pings";
import { cn } from "@/lib/utils";

import EventCard from "../components/main/EventCard";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

{
  /* Example data for event card */
}
const EventData = {
  //example data
  date: "2023-05-01",
  name: "Tree Planting & Social Swim",
  location: "Glenoma Park, Brinsmead",
  description:
    "2 hours of fun, Tree planting, Music, Swims and food (snacks provided)",
  items: [
    "Your hat,",
    "Water bottle,",
    "sunscreen,",
    "swimmers for fresh water creek hangout :)",
  ],
};

export default function Home() {
  const [clicked, setClicked] = useState(false);
  const { data, isLoading } = usePings({
    enabled: clicked,
  });

  const repeatCount = 1;

  return (
    <main
      className={cn(
        "m-0 flex min-h-screen flex-col items-center p-0 font-sans",
        fontSans.variable,
      )}
    >
      <Header />
      {/* The EventCard */}
      <div className="p-5">
        <h1 className="mb-4 mt-4 text-xl font-bold">Upcoming Events</h1>
        {Array(repeatCount)
          .fill(null)
          .map((_, index) => (
            <EventCard
              key={index}
              date={EventData.date}
              name={EventData.name}
              location={EventData.location}
              description={EventData.description}
              items={EventData.items}
              position={
                repeatCount === 1
                  ? "single"
                  : index === 0
                    ? "first"
                    : index === repeatCount - 1
                      ? "last"
                      : "middle"
              }
            />
          ))}
      </div>
    </main>
  );
}
