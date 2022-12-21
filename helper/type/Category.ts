export interface Category {
  id: number;
  name: string;
  slug: string;
  created_at: Date;
  updated_at: Date;
  pivot: Pivot;
}

export interface Pivot {
  product_id: number;
  category_id: number;
}
