import { z } from "zod";

import { Branch } from "@/hooks/useBranches";

import { Coordinates } from "./map";

export type EventStatus = "Cancelled" | "Upcoming" | "Past" | "Ongoing";

export type Event = {
  id: number;
  created_at: Date;
  updated_at: Date;
  title: string;
  description: string;
  image: string;
  start_time: Date;
  end_time: Date;
  location: string;
  coordinates?: Coordinates;
  branch: Branch;
  payment_link: string;
  status: EventStatus;
};

export type EventUpdateDetails = {
  title: string;
  description: string;
  branch_id: number;
  start_time: string;
  end_time: string;
  location: string;
  coordinates?: Coordinates;
  payment_link: string;
  image?: File;
};

export const schema = z.object({
  title: z.string().min(1, "Must be at least 1 character"),
  description: z.string().min(1, "Must be at least 1 character"),
  branch_id: z.number({ message: "Required" }),
  start_date: z.date(),
  end_date: z.date(),
  location: z.string().min(1, "Must be at least 1 character"),
  coordinates: z.custom<Coordinates | null>(),
  payment_link: z.string().url().or(z.string().max(0)),
});
