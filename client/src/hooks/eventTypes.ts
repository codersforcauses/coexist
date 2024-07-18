import { Branch } from "@/hooks/branchTypes";

export interface Event {
  id: number;
  branch: Branch;
  branch_id: number;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  title: string;
  description: string;
  image: string | null;
  start_time: string;
  end_time: string;
  location: string;
  payment_link: string;
  is_cancelled: boolean;
}

export interface EventResponse {
  count: number;
  next: string;
  previous: string;
  results: Event[];
}
