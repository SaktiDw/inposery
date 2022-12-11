export interface GeneratedConversions {
  preview: boolean;
}

export interface Medium {
  id: number;
  model_type: string;
  model_id: number;
  uuid: string;
  collection_name: string;
  name: string;
  file_name: string;
  mime_type: string;
  disk: string;
  conversions_disk: string;
  size: number;
  manipulations: any[];
  custom_properties: any[];
  generated_conversions: GeneratedConversions;
  responsive_images: any[];
  order_column: number;
  created_at: Date;
  updated_at: Date;
  original_url: string;
  preview_url: string;
}

export interface Store {
  id: number;
  name: string;
  user_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface Product {
  id: number;
  name: string;
  sell_price: number;
  qty: number;
  store_id: number;
  created_at: Date;
  updated_at: Date;
  media: Medium[];
  store: Store;
}

export interface Link {
  url: string | null;
  label: string;
  active: boolean;
}

export interface RootObject {
  current_page: number;
  data: Product[];
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
