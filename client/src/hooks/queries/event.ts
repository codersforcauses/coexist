import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import { AxiosError } from "axios";

import api from "@/lib/api";
import type { Event, EventUpdateDetails } from "@/types/event";

// Must use form data in order for image upload to work
function createFormData(details: EventUpdateDetails): FormData {
  const formData = new FormData();
  formData.append("title", details.title);
  formData.append("description", details.description);
  formData.append("branch_id", details.branch_id.toString());
  formData.append("start_time", details.start_time);
  formData.append("end_time", details.end_time);
  formData.append("location", details.location);
  if (details.coordinates) {
    // Backend API allows max of 9 digits (because it is stored as decimal, not float)
    formData.append("lat", details.coordinates.lat.toString().substring(0, 9));
    formData.append("lon", details.coordinates.lon.toString().substring(0, 9));
  } else {
    formData.append("lat", "");
    formData.append("lon", "");
  }
  formData.append("payment_link", details.payment_link);
  if (details.image) formData.append("image", details.image);
  return formData;
}

export const useGetEvent = (
  eventId: number,
  args?: Omit<UseQueryOptions<Event, AxiosError>, "queryKey" | "queryFn">,
) => {
  return useQuery<Event, AxiosError>({
    ...args,
    queryKey: ["event", eventId],
    queryFn: async () =>
      api.get(`/event/${eventId}/`).then((res) => {
        const coordinates =
          res.data.lat && res.data.lon
            ? { lat: parseFloat(res.data.lat), lon: parseFloat(res.data.lon) }
            : undefined;

        return {
          ...res.data,
          lat: undefined,
          lon: undefined,
          coordinates,
          start_time: new Date(res.data.start_time),
          end_time: new Date(res.data.end_time),
        };
      }),
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
      const formData = createFormData(details);
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
      const formData = createFormData(details);
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
