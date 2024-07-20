import { useQuery } from "@tanstack/react-query";

import api from "@/lib/api";

const useUser = () => {
  const { data, error } = useQuery({
    queryKey: ["user"],
    staleTime: 5 * 1000 * 60,

    queryFn: () => api.get("users/me/").then((res) => res.data),
  });

  if (error) {
    return false;
  }
  if (data) {
    return data as User;
  }
};

export default useUser;
