import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import api from "@/lib/api";

import { Event, PaginatedResponse } from "./eventTypes"; //using the interface defined here

export const getEvents = () => {
  return useQuery<PaginatedResponse<Event>>({
    queryKey: ["events"],
    queryFn: async () => {
      const response = await api.get<PaginatedResponse<Event>>("/event/");
      return response.data;
    },
  });
};
