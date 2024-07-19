import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import Error from "next/error";
import { useRouter } from "next/router";

import { EventPage } from "@/components/main/EventPage";
import api from "@/lib/api";

const useGetEvent = (
  eventId: string,
  args?: Omit<UseQueryOptions, "queryKey" | "queryFn">,
) => {
  return useQuery({
    ...args,
    queryKey: ["event", eventId],
    queryFn: () => api.get(`/event/${eventId}/`).then((res) => res.data),
  });
};

export default function Event() {
  const router = useRouter();
  const eventId = router.query.id as string;

  const { data, isLoading, error } = useGetEvent(eventId);

  if (error) {
    return <Error statusCode={404} />;
  } else if (isLoading) {
    return <div className="m-8">Loading</div>;
  } else {
    return (
      <EventPage
        title={data.title}
        description={data.description}
        what_to_bring="Your hat, water bottle, sunscreen and swimmers for the fresh water creek hangout :)"
        image_href="/eventImageInsta.jpg"
        branch_name={data.branch}
        location={data.location}
        start_time={data.start_time}
        end_time={data.end_time}
      />
    );
  }
}
