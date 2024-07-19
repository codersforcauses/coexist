import { Work_Sans as FontSans } from "next/font/google";
import Image from "next/image";
import React, { useState } from "react";

import Header from "@/components/main/header/Header";
import EventCard from "@/components/ui/EventCard_V3";
import EventCardNoImg from "@/components/ui/EventCardNoImg";
import { Event } from "@/hooks/eventTypes";
import { getEvents } from "@/hooks/getEvent";
import { usePings } from "@/hooks/pings";
import { rsvpEvent } from "@/hooks/rsvpEvent";
import { cn } from "@/lib/utils";

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

  const {
    data: eventData,
    isLoading: eventLoading,
    error: eventError,
  } = getEvents({
    enabled: true,
  });

  console.log("eventData:", eventData);
  console.log("eventLoading:", eventLoading);
  console.log("eventError:", eventError);

  // Add this useEffect
  React.useEffect(() => {
    if (eventData) {
      console.log("Event data received:", eventData);
    }
  }, [eventData]);

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
        {eventLoading && <p>Loading events...</p>}
        {eventError && <p>Error loading events: {eventError.message}</p>}
        {!eventLoading &&
          !eventError &&
          eventData &&
          eventData.length === 0 && <p>No events found.</p>}
        {!eventLoading &&
          !eventError &&
          eventData &&
          eventData.length > 0 &&
          eventData.map((event: Event, index: number) =>
            event.image === null ? (
              <EventCardNoImg
                key={event.id || index}
                date={extractDate(event.start_time)}
                startTime={extractTime(event.start_time)}
                endTime={extractTime(event.end_time)}
                title={event.title}
                city={event.branch}
                location={event.location}
                description={event.description}
                rsvpURL=""
                position={
                  eventData.length === 1
                    ? "single"
                    : index === 0
                      ? "first"
                      : index === eventData.length - 1
                        ? "last"
                        : "middle"
                }
              />
            ) : (
              <EventCard
                key={event.id || index}
                date={extractDate(event.start_time)}
                startTime={extractTime(event.start_time)}
                endTime={extractTime(event.end_time)}
                title={event.title}
                city={event.branch}
                location={event.location}
                description={event.description}
                //image = ""
                image={adjustImageUrl(event.image)}
                rsvpURL={event.id}
                position={
                  eventData.length === 1
                    ? "single"
                    : index === 0
                      ? "first"
                      : index === eventData.length - 1
                        ? "last"
                        : "middle"
                }
              />
            ),
          )}
      </div>
    </main>
  );
}
