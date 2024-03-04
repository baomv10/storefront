export type Order = {
  id: number | null;
  status: string;
  quantity: number;
  user_id: number | null;
  product_id: number | null;
  product_name?: string;
};
