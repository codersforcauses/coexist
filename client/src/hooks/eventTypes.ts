export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: Event[];
}

interface Branch {
  id: number;
  is_deleted: boolean;
  name: string;
  description: string;
}

export interface Event {
  id: string;
  start_time: string;
  end_time: string;
  title: string;
  branch: Branch;
  location: string;
  description: string;
  image: string;
}
