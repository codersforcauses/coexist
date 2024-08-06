import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import api from "@/lib/api";

interface City {
  id: number;
  name: string;
}
interface Cities {
  results: City[];
}

const selectCity = () => {
  return useQuery<Cities>({
    queryKey: ["branches"],
    queryFn: async () => {
      const response = await api.get("/branch/");
      console.log(response.data);
      return response.data;
    },
  });
};

export default selectCity;
