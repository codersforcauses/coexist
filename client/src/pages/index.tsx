import { Work_Sans as FontSans } from "next/font/google";
import { useState } from "react";

import Header from "@/components/main/header/Header";
import EventCard from "@/components/ui/EventCard_V3";
import { getEvents } from "@/hooks/getEvent";
import { usePings } from "@/hooks/pings";
import { cn } from "@/lib/utils";

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
  city: "Cairns",
  description:
    "2 hours of fun, Tree planting, Music, Swims and food (snacks provided)",
  items: [
    "Your hat,",
    "Water bottle,",
    "sunscreen,",
    "swimmers for fresh water creek hangout :)",
  ],
  refImageURL: "/tempEventImg.jpeg",
  rvspURL: "nil",
  startTime: "08:00",
  endTime: "11:00",
};

export default function Home() {
  const [clicked, setClicked] = useState(false);
  const { data: pingData, isLoading: loadingPing } = usePings({
    enabled: clicked,
  });


  const repeatCount = 3;

  const { data: eventData, isLoading: eventLoading } = getEvents({
    enabled: true,
  });

  function extractDate(dateTimeString: string): string {
    const [date] = dateTimeString.split("T");
    return date;
  }

  function extractTime(dateTimeString: string): string {
    const timePart = dateTimeString.split("T")[1];
    const [hours, minutes] = timePart.split(":");
    return `${hours}:${minutes}`;
  }

  return (
    <main
      className={cn(
        "m-0 flex min-h-screen flex-col items-center p-0 font-sans",
        fontSans.variable,
      )}
    >
      <div className="m-6">
        {!eventLoading &&
          eventData.map((event) => (
            <EventCard
              date={extractDate(event.start_time)}
              startTime={extractTime(event.start_time)}
              endTime={extractTime(event.end_time)}
              title={event.title}
              city={event.branch}
              location={event.location}
              description={event.description}
              refImageURL=""
              rsvpURL=""
            />
          ))}
      </div>

      <p> {JSON.stringify(eventData)}</p>
    </main>
  );
}
