import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import api from "@/lib/api";

export type Branch = {
  id: number;
  is_deleted: boolean;
  name: string;
  description: string;
};

export type EventStatus = "Cancelled" | "Upcoming" | "Past" | "Ongoing";

export type Event = {
  id: number;
  created_at: Date;
  updated_at: Date;
  title: string;
  description: string;
  image: string;
  start_time: Date;
  end_time: Date;
  location: string;
  location_url: string;
  branch: Branch;
  payment_link: string;
  status: EventStatus;
};

export const useGetEvent = (
  eventId: number,
  args?: Omit<UseQueryOptions<Event, Error>, "queryKey" | "queryFn">,
) => {
  return useQuery<Event, Error>({
    ...args,
    queryKey: ["event", eventId],
    queryFn: async () => api.get(`/event/${eventId}/`).then((res) => res.data),
    enabled: eventId !== undefined,
  });
};
