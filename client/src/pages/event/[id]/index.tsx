import Error from "next/error";
import { useRouter } from "next/router";

import { EventPage } from "@/components/main/EventPage";
import { WaitingLoader } from "@/components/ui/loading";
import { useGetEvent } from "@/hooks/queries/event";

export default function Event() {
  const router = useRouter();
  const eventId = router.query.id as string;

  const { data, isLoading, error } = useGetEvent(parseInt(eventId));

  if (error) {
    return <Error statusCode={error.response?.status || 500} />;
  } else if (isLoading) {
    return (
      <div className="flex justify-center pt-24">
        <WaitingLoader />
      </div>
    );
  } else if (data !== undefined) {
    return <EventPage event={data} />;
  }
}
