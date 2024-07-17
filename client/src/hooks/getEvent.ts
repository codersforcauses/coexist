import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import api from "@/lib/api";

import { Event } from "./eventTypes"; //using the interface defined here

//specified return type to solve unknown type error
export const getEvents = (
  args?: Omit<UseQueryOptions<Event[], Error>, "queryKey" | "queryFn">,
) => {
  return useQuery<Event[], Error>({
    ...args,
    queryKey: ["getEvents"],
    queryFn: () => api.get<Event[]>("/event/").then((res) => res.data),
  });
};
