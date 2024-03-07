/* eslint-disable @typescript-eslint/ban-ts-comment */

// @ts-ignore
import Client from '../database';
import { OrderCommand, OrderViewModel } from '../types/order';

export class OrderStore {
  async create(order: OrderCommand): Promise<boolean> {
    try {
      const sql = 'INSERT INTO orders (id, userId, status) VALUES($1, $2, $3)';
      // @ts-ignore
      const conn = await Client.connect();

      await conn.query(sql, [
        order.id,
        order.userId,
        order.status,
      ]);

      if (order.orderDetails?.length > 0) {
        const order_detail = order.orderDetails.map((detail) => ({
          id: detail.id,
          quantity: detail.quantity,
          product_id: detail.productId,
          order_id: order.id,
        }));

        const query = `INSERT INTO order_details (id, productId, orderId, quantity)
                        SELECT id, product_id, order_id, quantity
                        FROM jsonb_to_recordset($1::jsonb) AS t(id text, product_id text, order_id text, quantity int)`;

        await conn.query(query, [JSON.stringify(order_detail)]);
        conn.release();
        return true;
      }

      conn.release();
      return true;
    } catch (err) {
      throw new Error(`Could not add new order. ${err}`);
    }
  }

  async getOrderByUser(userId: string): Promise<Array<OrderViewModel>> {
    try {
      // @ts-ignore
      const conn = await Client.connect();

      const sql = `SELECT o.id, od.productId, od.quantity, o.userId, o.status
                    FROM orders o JOIN order_details od ON o.id = od.orderId
                    WHERE o.userId = ($1)`;
      const orders = await conn.query(sql, [userId]);

      conn.release();

      return orders.rows;
    } catch (err) {
      throw new Error(`Could not get orders. ${err}`);
    }
  }

  async completeOrderByUser(userId: string): Promise<boolean> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = `update orders set status = $1 where userId = ($2) RETURNING *`;
      const order = await conn.query(sql, ['Completed', userId]);
      conn.release();
      return order?.rows?.length > 0;
    } catch (err) {
      throw new Error(`Could not get orders. ${err}`);
    }
  }
}
