import { Link } from "./Response";
import { Store } from "./Store";

export interface Product {
  id: number;
  name: string;
  sell_price: number;
  qty: number;
  store_id: number;
  created_at: Date;
  updated_at: Date;
  media: any[];
  store: Store;
}

export interface ProductResponse {
  current_page: number;
  data: Product[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url?: any;
  to: number;
  total: number;
}

export interface ProductInput {
  name: string;
  sell_price: string;
  store_id: string | string[] | undefined;
  image: string;
}
