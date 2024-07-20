import { useQuery } from "@tanstack/react-query";

import api from "@/lib/api";

const useUser = () => {
  const { data, error } = useQuery({
    queryKey: ["user"],

    queryFn: () => api.get("users/me/").then((res) => res.data),
  });
  if (error) {
    process.env.APP_ENV == "DEVELOPMENT" ? "" : console.error(error);
    return false;
  }
  if (data) {
    return data as User;
  }
};

export default useUser;
