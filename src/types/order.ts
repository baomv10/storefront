export type OrderCommand = {
  id: string;
  status: string;
  user_id: string;
  order_details: Array<OrderDetailCommand>;
};

export type OrderViewModel = {
  id: string;
  status: string;
  user_id: number;
  firstName: string;
  lastName: string;
  order_details: Array<OrderDetailViewModel>;
};

export type OrderDetailCommand = {
  id: string;
  product_id: string;
  quantity: number;
};

export type OrderDetailViewModel = {
  id: string;
  product_id: number;
  product_name: string;
  quantity: string;
  order_id: string;
};
