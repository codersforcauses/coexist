import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import { AxiosError } from "axios";

import api from "@/lib/api";

export const useHasRsvp = (
  eventId: number,
  args?: Omit<UseQueryOptions<boolean, AxiosError>, "queryKey" | "queryFn">,
) => {
  return useQuery<boolean, AxiosError>({
    ...args,
    queryKey: ["event_has_rsvp", eventId],
    queryFn: async () =>
      api.get(`/event/${eventId}/has_rsvp/`).then((res) => res.data.has_rsvp),
  });
};

export const useAddRsvp = (event_id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["rsvp_add", event_id],
    mutationFn: () => {
      return api.post(`/event/${event_id}/rsvp/`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["event_has_rsvp", event_id] });
    },
  });
};

export const useDeleteRsvp = (event_id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["rsvp_delete", event_id],
    mutationFn: () => {
      return api.delete(`/event/${event_id}/rsvp/`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["event_has_rsvp", event_id] });
    },
  });
};
