import Error from "next/error";
import { useRouter } from "next/router";

import { EventPage } from "@/components/main/EventPage";
import { useGetEvent } from "@/hooks/useEvent";

export default function Event() {
  const router = useRouter();
  const eventId = router.query.id as string;

  const { data, isLoading, error } = useGetEvent(Number(eventId));

  if (error) {
    return <Error statusCode={404} />;
  } else if (isLoading) {
    return <div className="m-8">Loading</div>;
  } else if (data !== undefined) {
    return <EventPage event={data} />;
  }
}
