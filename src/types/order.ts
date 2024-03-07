export type OrderViewModel = {
  id: string;
  status: string;
  userId: string;
  productId: string;
  quantity: number;
};

export type OrderCommand = {
  id: string;
  status: string;
  userId: string;
  orderDetails: Array<OrderDetailCommand>;
};

export type OrderDetailCommand = {
  id: string;
  productId: string;
  quantity: number;
};
