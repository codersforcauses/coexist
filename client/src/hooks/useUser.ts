import {
  useMutation,
  UseMutationOptions,
  useQuery,
} from "@tanstack/react-query";
import { AxiosError } from "axios";

import { useAuth } from "@/context/AuthProvider";
import api from "@/lib/api";
import { User } from "@/types/user";

type RegistrationDetails = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  branch: number;
};

export const useUser = () => {
  const { userId } = useAuth();
  return useQuery<User, AxiosError>({
    queryKey: ["user", userId],
    staleTime: 5 * 1000 * 60,
    enabled: userId != null,
    queryFn: () =>
      api.get("users/me/").then((res) => {
        return res.data;
      }),
  });
};

export const useRegister = (
  args?: Omit<
    UseMutationOptions<unknown, AxiosError, RegistrationDetails>,
    "mutationKey" | "mutationFn"
  >,
) => {
  return useMutation({
    ...args,
    mutationKey: ["register"],
    mutationFn: (details: RegistrationDetails) => {
      const correctDetails = {
        first_name: details.firstName,
        last_name: details.lastName,
        city: details.branch,
        ...details,
      };
      return api.post("users/register/", correctDetails);
    },
  });
};
