import { Branch } from "@/hooks/branchTypes";

export interface Event {
  id: string;
  start_time: string;
  end_time: string;
  title: string;
  branch: Branch;
  location: string;
  description: string;
}

export interface EventResponse {
  count: number;
  next: string;
  previous: string;
  results: Event[];
}
