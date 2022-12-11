export interface Store {
  id: number;
  name: string;
  user_id: number;
  created_at: Date;
  updated_at: Date;
  media?: any[];
}

export interface Link {
  url: string;
  label: string;
  active: boolean;
}

export interface StoresResponse {
  current_page: number;
  data: Store[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url?: any;
  path: string;
  per_page: number;
  prev_page_url?: any;
  to: number;
  total: number;
}

export interface StoreInput {
  name: string;
  user: number;
  image: string;
}
