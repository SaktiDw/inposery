export interface Transaction {
  total: string;
  year: number;
  month: number;
  type: string;
  store_id: number;
}

export interface DashboardResponse {
  id: number;
  name: string;
  user_id: number;
  created_at: Date;
  updated_at: Date;
  total_in: string;
  total_in_yesterday?: any;
  total_in_today: string;
  total_out: string;
  total_out_yesterday?: any;
  total_out_today: string;
  transaction: Transaction[];
}
