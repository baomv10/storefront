/* eslint-disable @typescript-eslint/ban-ts-comment */

// @ts-ignore
import Client from '../database';
import { Order } from '../types/order';

export class OrderStore {
  async create(order: Order): Promise<Order> {
    try {
      const sql =
        'INSERT INTO orders (user_id, product_id, quantity, status) VALUES($1, $2, $3, $4) RETURNING *';
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sql, [
        order.user_id,
        order.product_id,
        order.quantity,
        order.status,
      ]);
      const p = result.rows[0];
      conn.release();
      return p;
    } catch (err) {
      throw new Error(`Could not add new order. Error: ${err}`);
    }
  }

  async getOrderByUser(userId: string): Promise<Array<Order>> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = `SELECT o.id, o.status, o.quantity, u.first_name, u.last_name, p.name as product_name
                        FROM orders o JOIN users u ON u.id = o.user_id JOIN products p ON p.id = o.product_id
                        WHERE o.user_id = ($1)`;
      const orders = await conn.query(sql, [userId]);
      conn.release();
      return orders.rows;
    } catch (err) {
      throw new Error(`Could not get orders. Error: ${err}`);
    }
  }

  async completeOrderByUser(userId: string): Promise<boolean> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = `update orders set status = $1 where user_id = ($2)`;
      const orders = await conn.query(sql, ['Completed', userId]);
      conn.release();
      return orders.rowCount > 0;
    } catch (err) {
      throw new Error(`Could not get orders. Error: ${err}`);
    }
  }
}
