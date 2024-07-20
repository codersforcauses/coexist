export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  role: Role;
  phone: string;
}
export type Role = "Admin" | "Poster" | "Attendee";
