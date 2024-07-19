import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import api from "@/lib/api";

export const rsvpEvent = (
  eventId: string,
  args?: Omit<UseQueryOptions<Event[], Error>, "queryKey" | "queryFn">,
) => {
  return useQuery<Event[], Error>({
    ...args,
    queryKey: ["rsvpEvent", eventId],
    queryFn: async () => {
      console.log("sending RSVP...");
      try {
        const response = await api.post(`/event/${eventId}/rsvp`);
        console.log("API response:", response.data);
        return response.data;
      } catch (error) {
        console.error("Error fetching events:", error);
        throw error;
      }
    },
  });
};
