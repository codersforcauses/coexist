import { Work_Sans as FontSans } from "next/font/google";

import EventList from "@/components/main/EventList";
import { WaitingLoader } from "@/components/ui/loading";
import { useGetEventList } from "@/hooks/queries/event";
import { useUser } from "@/hooks/useUser";

export default function Home() {
  const { data: user_data } = useUser();
  const branchId = user_data?.branch_id;

  const { data: events, isPending, isError } = useGetEventList(branchId);

  if (isPending) {
    return (
      <div className="flex justify-center pt-24">
        <WaitingLoader />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center px-4 pt-24 text-center text-xl text-destructive">
        Error loading events. Please contact the administrator.
      </div>
    );
  }

  return <EventList events={events} />;
}
