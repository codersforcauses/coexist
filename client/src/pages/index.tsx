import { Work_Sans as FontSans } from "next/font/google";

import EventCard from "@/components/ui/EventCard_V3";
import { useGetEventList } from "@/hooks/useEventsList";
import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function Home() {
  const eventId = 1;
  const { data: events, isLoading, isError } = useGetEventList(eventId);
  // append process.env.NEXT_PUBLIC_BACKEND_URL to refImageURL of all events
  events?.forEach((event) => {
    event.image = process.env.NEXT_PUBLIC_BACKEND_URL + event.image;
    return event;
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading events</div>;

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
        {/* Map out from events, check undefined first */}
        {events?.map((event) => (
          <EventCard
            key={event.id}
            date={new Date(event.start_time).toISOString().split("T")[0]} // Convert Date to string
            startTime={new Date(event.start_time).toLocaleTimeString()} // Convert Date to string
            endTime={new Date(event.end_time).toLocaleTimeString()} // Convert Date to string
            title={event.title}
            city={event.branch.name}
            location={event.location}
            description={event.description}
            refImageURL={event.image}
            rsvpURL={event.payment_link}
          />
        ))}
      </div>
    </main>
  );
}
