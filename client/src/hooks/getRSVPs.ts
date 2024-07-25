import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import api from "@/lib/api";

interface EventDetails {
  id: number;
  title: string;
}

interface User {
  first_name: string;
  last_name: string;
  email: string;
}

interface RSVP {
  user: User;
}

export const useRSVPs = (
  eventId: number,
  args?: Omit<UseQueryOptions<RSVP[]>, "queryKey" | "queryFn">,
) => {
  return useQuery<RSVP[]>({
    ...args,
    queryKey: ["rsvps", eventId],
    queryFn: () => api.get(`/event/${eventId}/rsvp/`).then((res) => res.data),
  });
};

export const useEventDetails = (
  eventId: number,
  args?: Omit<UseQueryOptions<EventDetails>, "queryKey" | "queryFn">,
) => {
  return useQuery<EventDetails>({
    ...args,
    queryKey: ["eventDetails", eventId],
    queryFn: () => api.get(`/event/${eventId}/`).then((res) => res.data),
  });
};
