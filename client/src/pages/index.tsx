import { Work_Sans as FontSans } from "next/font/google";
import { useEffect, useState } from "react";

import Header from "@/components/main/header/Header";
import EventCard from "@/components/ui/EventCard_V3";
import { Branch } from "@/hooks/branchTypes";
import { Event, EventResponse } from "@/hooks/eventTypes";
import api from "@/lib/api";
import { cn } from "@/lib/utils";

import NewEvent from "../components/main/newevent/NewEvent";
import { Button } from "../components/ui/button";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const getPosition = (index: number, length: number) => {
  if (length === 1) return "single";
  if (index === 0) return "first";
  if (index === length - 1) return "last";
  return "middle";
};

export default function Home() {
  const [events, setEventData] = useState<EventResponse | null>(null);
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

  const eventData = events ? events.results : [];

  console.log("eventData:", eventData);
  console.log("eventLoading:", eventLoading);

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
              data={event}
              position={getPosition(index, eventData.length)}
            />
          ))}
      </div>

      {/*<p> {JSON.stringify(eventData)}</p>*/}
    </main>
  );
}
