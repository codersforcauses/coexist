import { Work_Sans as FontSans } from "next/font/google";
import { useEffect, useState } from "react";

import EventCard from "@/components/ui/EventCard_V3";
import { WaitingLoader } from "@/components/ui/loading";
import { useGetEventList } from "@/hooks/queries/event";
import { useAuth } from "@/hooks/useAuth";
import useUser from "@/hooks/useUser";
import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function Home() {
  const [branchId, setBranchId] = useState<string | undefined>(undefined);
  const { isLoggedIn } = useAuth();
  const { data: user_data } = useUser();

  useEffect(() => {
    if (isLoggedIn && user_data) {
      setBranchId(user_data.branch_id);
    } else {
      setBranchId(undefined);
    }
  }, [isLoggedIn, user_data]);
  const { data: events, isLoading, isError } = useGetEventList(branchId);

  if (isLoading) {
    return (
      <div className="flex justify-center pt-24">
        <WaitingLoader />
      </div>
    );
  }
  if (isError)
    return (
      <div className="flex justify-center px-4 pt-24 text-center text-xl text-destructive">
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
      {events?.length === 0 ? (
        <h1 className="mt-8 px-4 text-center text-xl text-primary md:text-3xl">
          No events upcoming at the moment! Check this space later.
        </h1>
      ) : (
        events?.map((event) => (
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
        ))
      )}
    </main>
  );
}
