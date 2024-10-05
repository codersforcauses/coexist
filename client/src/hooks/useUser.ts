import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import api from "@/lib/api";
import { User } from "@/types/user";

const useUser = () => {
  return useQuery<User, AxiosError>({
    queryKey: ["user"],
    staleTime: 5 * 1000 * 60,

    queryFn: () =>
      api.get("users/me/").then((res) => {
        return res.data;
      }),
  });
};

export default useUser;
