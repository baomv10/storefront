export type OrderViewModel = {
  id: string;
  status: string;
  user_id: string;
  product_id: string;
  quantity: number;
};

export type OrderCommand = {
  id: string;
  status: string;
  user_id: string;
  order_details: Array<OrderDetailCommand>;
};

export type OrderDetailCommand = {
  id: string;
  product_id: string;
  quantity: number;
};
