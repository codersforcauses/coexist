import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import { AxiosError } from "axios";

import { Branch } from "@/hooks/useBranches";
import api from "@/lib/api";

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

export type EventUpdateDetails = {
  title: string;
  description: string;
  branch_id: number;
  start_time: string;
  end_time: string;
  location: string;
  location_url: string;
  payment_link: string;
  image?: File;
};

export const useGetEvent = (
  eventId: number,
  args?: Omit<UseQueryOptions<Event, AxiosError>, "queryKey" | "queryFn">,
) => {
  return useQuery<Event, AxiosError>({
    ...args,
    queryKey: ["event", eventId],
    queryFn: async () =>
      api.get(`/event/${eventId}/`).then((res) => ({
        ...res.data,
        start_time: new Date(res.data.start_time),
        end_time: new Date(res.data.end_time),
      })),
    enabled: !isNaN(eventId),
  });
};

export const useGetEventList = (
  branchId: string | undefined,
  args?: Omit<UseQueryOptions<Event[], AxiosError>, "queryKey" | "queryFn">,
) => {
  return useQuery<Event[], AxiosError>({
    ...args,
    queryKey: ["events", branchId],
    queryFn: async () => {
      let data;
      if (branchId === undefined) {
        const res = await api.get(`/event/`);
        data = res.data.results;
      } else {
        const res = await api.get(`/event/branch/${branchId}/`);
        data = res.data;
        data.forEach((event: Event) => {
          if (event.image !== null) {
            event.image =
              process.env.NEXT_PUBLIC_BACKEND_IMAGES_URL + event.image;
          }
        });
      }
      return data;
    },
  });
};

export const useCreateEvent = (
  args?: Omit<
    UseMutationOptions<Event, AxiosError, EventUpdateDetails>,
    "mutationKey" | "mutationFn"
  >,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    ...args,
    mutationKey: ["event_create"],
    mutationFn: (details: EventUpdateDetails) => {
      const formData = new FormData();
      formData.append("title", details.title);
      formData.append("description", details.description);
      formData.append("branch_id", details.branch_id.toString());
      formData.append("start_time", details.start_time);
      formData.append("end_time", details.end_time);
      formData.append("location", details.location);
      formData.append("location_url", details.location_url);
      formData.append("payment_link", details.payment_link);
      if (details.image) formData.append("image", details.image);

      return api.post(`/event/`, formData).then((res) => res.data);
    },
    onSuccess: (data, details, context) => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      if (args?.onSuccess) args.onSuccess(data, details, context);
    },
  });
};

export const useUpdateEvent = (
  eventId: number,
  args?: Omit<
    UseMutationOptions<unknown, AxiosError, EventUpdateDetails>,
    "mutationKey" | "mutationFn"
  >,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    ...args,
    mutationKey: ["event_update", eventId],
    mutationFn: (details: EventUpdateDetails) => {
      const formData = new FormData();
      formData.append("title", details.title);
      formData.append("description", details.description);
      formData.append("branch_id", details.branch_id.toString());
      formData.append("start_time", details.start_time);
      formData.append("end_time", details.end_time);
      formData.append("location", details.location);
      formData.append("location_url", details.location_url);
      formData.append("payment_link", details.payment_link);
      if (details.image) formData.append("image", details.image);

      return api.put(`/event/${eventId}/`, formData);
    },
    onSuccess: (data, details, context) => {
      // TODO: replace with returned data instead?
      queryClient.invalidateQueries({ queryKey: ["event", eventId] });
      queryClient.invalidateQueries({ queryKey: ["events"] });
      if (args?.onSuccess) args.onSuccess(data, details, context);
    },
  });
};
