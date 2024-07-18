import { Work_Sans as FontSans } from "next/font/google";
import { useEffect, useState } from "react";

import Header from "@/components/main/header/Header";
import EventCard from "@/components/ui/EventCard_V3";
import { Event } from "@/hooks/eventTypes";
import api from "@/lib/api";
import { cn } from "@/lib/utils";

import NewEvent from "../components/main/newevent/NewEvent";
import { Button } from "../components/ui/button";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function Home() {
  const [eventData, setEventData] = useState<Event[]>([]);
  const [eventLoading, setEventLoading] = useState(true);

  useEffect(() => {
    async function fetchEventData() {
      try {
        const response = await api.get("/event/");
        setEventData(response.data);
        setEventLoading(false);
      } catch (error) {
        console.error("Error fetching event data:", error);
        setEventLoading(false);
      }
    }

    fetchEventData();
  }, []);

  console.log("eventData:", eventData);
  console.log("eventLoading:", eventLoading);

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
        {!eventLoading && eventData && eventData.length === 0 && (
          <p>No events found.</p>
        )}
        {!eventLoading &&
          eventData &&
          eventData.map((event: Event, index: number) => (
            <EventCard
              key={event.id || index} // Prefer using event.id if available
              date={extractDate(event.start_time)}
              startTime={extractTime(event.start_time)}
              endTime={extractTime(event.end_time)}
              title={event.title}
              city={event.branch}
              location={event.location}
              description={event.description}
              refImageURL=""
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
          ))}
      </div>

      {/*<p> {JSON.stringify(eventData)}</p>*/}
    </main>
  );
}
