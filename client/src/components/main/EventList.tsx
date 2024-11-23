import { Event } from "@/hooks/queries/event";
import { cn } from "@/lib/utils";

import EventCard from "../ui/EventCard";

export default function EventList({
  events,
  className,
  emptyMessage = "No events upcoming at the moment! Check this space later.",
}: {
  events: Event[];
  className?: string;
  emptyMessage?: string;
}) {
  return (
    <ul className={cn("space-y-2", className)}>
      {events.length === 0 ? (
        <h1 className="mt-8 px-4 text-center text-xl text-primary md:text-3xl">
          {emptyMessage}
        </h1>
      ) : (
        events.map((event) => <EventCard key={event.id} event={event} />)
      )}
    </ul>
  );
}
