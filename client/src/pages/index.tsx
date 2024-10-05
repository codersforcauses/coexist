import { Work_Sans as FontSans } from "next/font/google";

import EventCard from "@/components/ui/EventCard_V3";
import { WaitingLoader } from "@/components/ui/loading";
import { useAuth } from "@/hooks/useAuth";
import { useGetEventList } from "@/hooks/useEventsList";
import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function Home() {
  const { isLoggedIn } = useAuth();
  const eventId = 1;
  const { data: events, isLoading, isError } = useGetEventList(eventId);

  if (!isLoggedIn) {
    return (
      <div className="flex justify-center pt-24">
        <h1 className="text-center text-3xl text-primary">
          Please log in to view events
        </h1>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="flex justify-center pt-24">
        <WaitingLoader />
      </div>
    );
  }
  if (isError)
    return (
      <div className="flex justify-center pt-24 text-center text-destructive">
        Error loading events. Please contact the administrator.
      </div>
    );

  return (
    <main
      className={cn(
        "m-0 flex min-h-screen flex-col items-center p-0 font-sans",
        fontSans.variable,
      )}
    >
      {/* Map out from events, check undefined first */}
      {events?.map((event) => (
        <EventCard
          key={event.id}
          id={event.id}
          startTime={event.start_time}
          endTime={event.end_time}
          title={event.title}
          city={event.branch.name}
          location={event.location}
          description={event.description}
          refImageURL={event.image}
          rsvpURL={event.payment_link}
        />
      ))}
    </main>
  );
}
