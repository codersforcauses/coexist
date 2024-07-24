import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

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
  branch: Branch;
  status: EventStatus;
};

export type RsvpInfo =
  | {
      has_rsvp: boolean;
      rsvp_id: number;
    }
  | {
      has_rsvp: false;
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

export const useGetUserHasRsvp = (
  eventId: number,
  args?: Omit<UseQueryOptions<RsvpInfo, AxiosError>, "queryKey" | "queryFn">,
) => {
  return useQuery<RsvpInfo, AxiosError>({
    ...args,
    queryKey: ["event_has_rsvp", eventId],
    queryFn: async () =>
      api.get(`/event/${eventId}/has_rsvp`).then((res) => res.data.has_rsvp),
  });
};
