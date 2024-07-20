import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import api from "@/lib/api";

export const useRSVPs = (
  eventId: number,
  args?: Omit<UseQueryOptions, "queryKey" | "queryFn">,
) => {
  return useQuery({
    ...args,
    queryKey: ["rsvps", eventId],
    queryFn: () => api.get(`/event/${eventId}/rsvp/`).then((res) => res.data),
  });
};

export const useEventDetails = (
  eventId: number,
  args?: Omit<UseQueryOptions, "queryKey" | "queryFn">,
) => {
  return useQuery({
    ...args,
    queryKey: ["eventDetails", eventId],
    queryFn: () => api.get(`/event/${eventId}/`).then((res) => res.data),
  });
};
