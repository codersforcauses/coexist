import { useQuery } from "@tanstack/react-query";

import api from "@/lib/api";
import { User } from "@/types/user";

const useUser = () => {
  return useQuery<User>({
    queryKey: ["user"],
    staleTime: 5 * 1000 * 60,

    queryFn: () => api.get("users/me/").then((res) => res.data),
  });
};

export default useUser;
