import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import api from "@/lib/api";

import { Event } from "./eventTypes"; //using the interface defined here

export const getEvents = (
  args?: Omit<UseQueryOptions<Event[], Error>, "queryKey" | "queryFn">,
) => {
  return useQuery<Event[], Error>({
    ...args,
    queryKey: ["getEvents"],
    queryFn: async () => {
      console.log("Fetching events...");
      try {
        const response = await api.get<Event[]>("/event/");
        console.log("API response:", response.data);
        return response.data;
      } catch (error) {
        console.error("Error fetching events:", error);
        throw error;
      }
    },
  });
};
