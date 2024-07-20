import { useMutation, useQuery, UseQueryOptions } from "@tanstack/react-query";

import api from "@/lib/api";

export const rsvpRemove = (
  eventId: string,
  args?: Omit<UseQueryOptions<Event[], Error>, "queryKey" | "queryFn">,
) => {
  return useQuery<Event[], Error>({
    ...args,
    queryKey: ["rsvpEvent", eventId],
    queryFn: async () => {
      console.log("deleting RSVP...");
      try {
        const response = await api.delete(`/event/${eventId}/rsvp`, {});
        console.log("API response:", response.data);
        return response.data;
      } catch (error) {
        console.error("Error fetching events:", error);
        throw error;
      }
    },
  });
};
