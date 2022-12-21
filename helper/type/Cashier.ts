export interface Cart {
  id: number;
  name: string;
  sell_price: number;
  qty: number;
  orderQty: number;
  customer: Customer;
}

export interface Customer {
  name: string;
  active: boolean;
}
