import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import api from "@/lib/api";

export const getEvents = (
  args?: Omit<UseQueryOptions, "queryKey" | "queryFn">,
) => {
  return useQuery({
    ...args,
    queryKey: ["getEvents"],
    queryFn: () => api.get("/event/").then((res) => res.data),
  });
};
