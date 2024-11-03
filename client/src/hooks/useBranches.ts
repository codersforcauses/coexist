import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

import api from "@/lib/api";

export type Branch = {
  id: number;
  is_deleted: boolean;
  name: string;
  description: string;
};

const useGetBranches = (
  args?: Omit<UseQueryOptions<Branch[], AxiosError>, "queryKey" | "queryFn">,
) => {
  return useQuery<Branch[], AxiosError>({
    ...args,
    queryKey: ["branches"],
    queryFn: async () => {
      const response = await api.get("/branch/");
      return response.data.results;
    },
  });
};

export default useGetBranches;
