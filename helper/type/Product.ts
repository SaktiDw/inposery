import { Option } from "react-multi-select-component";
import { Category } from "./Category";
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
  category: Category[];
}

export interface ProductResponse {
  current_page: number;
  data: Product[];
  first_page_url: string | null;
  from: number;
  last_page: number;
  last_page_url: string | null;
  links: Link[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url?: any | null;
  to: number;
  total: number;
}

export interface ProductInput {
  name: string;
  sell_price: string;
  store_id: string | string[] | undefined;
  image: string;
  category?: Option[];
}
