import { Work_Sans as FontSans } from "next/font/google";
import Image from "next/image";
import React, { useState } from "react";

import Header from "@/components/main/header/Header";
import RsvpListModal from "@/components/main/RsvpListModal";
import EventCard from "@/components/ui/EventCard_V3";
import EventCardNoImg from "@/components/ui/EventCardNoImg";
import { Event } from "@/hooks/eventTypes";
import { getEvents } from "@/hooks/getEvent";
import { usePings } from "@/hooks/pings";
import { rsvpEvent } from "@/hooks/rsvpEvent";
import { cn } from "@/lib/utils";

import { Button } from "../components/ui/button";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const adjustImageUrl = (url: string) => {
  return url
    .replace("http://localhost:8000", "http://coexist-server:8000")
    .replace("/media/static/", "/static/");
};

export default function Home() {
  const [clicked, setClicked] = useState(false);
  const { data: pingData, isLoading: loadingPing } = usePings({
    enabled: clicked,
  });

  const { data: eventData, isLoading, error } = getEvents();

  console.log("Main events list index file is running");
  console.log("eventData:", eventData);
  console.log("Error:", error);

  function extractDate(dateTimeString: string): string {
    const [date] = dateTimeString.split("T");
    return date;
  }

  function extractTime(dateTimeString: string): string {
    const timePart = dateTimeString.split("T")[1];
    const [hours, minutes] = timePart.split(":");
    return `${hours}:${minutes}`;
  }

  const eventId = 1;

  return (
    <main
      className={cn(
        "m-0 flex min-h-screen flex-col items-center p-0 font-sans",
        fontSans.variable,
      )}
    >
      <div className="m-6">
        {!isLoading &&
        eventData &&
        eventData.results &&
        eventData.results.length > 0 ? (
          eventData.results.map((event: Event, index: number) => (
            <EventCard
              key={event.id || index}
              date={extractDate(event.start_time)}
              startTime={extractTime(event.start_time)}
              endTime={extractTime(event.end_time)}
              title={event.title}
              city={event.branch.name}
              location={event.location}
              description={event.description}
              image={event.image ? adjustImageUrl(event.image) : ""}
              rsvpURL=""
              position={
                eventData.results.length === 1
                  ? "single"
                  : index === 0
                    ? "first"
                    : index === eventData.results.length - 1
                      ? "last"
                      : "middle"
              }
            />
          ))
        ) : (
          <p>No events found</p>
        )}
      </div>

      {/* <h1 className="text-3xl text-primary">Test title</h1>
      <Button onClick={() => setClicked(true)}>
        {isLoading ? "Loading" : "Ping"}
      </Button>
      <p>
        Response from server: <span>{data as string}</span>
      </p>
      <RsvpListModal eventId={eventId} /> */}
    </main>
  );
}
