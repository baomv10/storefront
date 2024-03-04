/* eslint-disable @typescript-eslint/ban-ts-comment */

// @ts-ignore
import Client from '../database';
import { Product } from '../types/product';

export class ProductStore {
  async index(): Promise<Array<Product>> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = 'SELECT id, name, price, category FROM products';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get products. Error: ${err}`);
    }
  }

  async show(id: string): Promise<Product> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = 'SELECT * FROM products WHERE id = ($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find book ${id}. Error: ${err}`);
    }
  }

  async create(product: Product): Promise<Product> {
    try {
      const sql =
        'INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *';
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sql, [
        product.name,
        product.price,
        product.category,
      ]);
      const p = result.rows[0];
      conn.release();
      return p;
    } catch (err) {
      throw new Error(
        `Could not add new product ${product.name}. Error: ${err}`,
      );
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const sql = 'DELETE FROM products WHERE id=($1)';
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rowCount > 0;
    } catch (err) {
      throw new Error(`Could not delete product ${id}. Error: ${err}`);
    }
  }

  async topFivePopular(): Promise<Array<Product>> {
    try {
      //@ts-ignore
      const conn = await Client.connect();
      const sql = 'SELECT * FROM products LIMIT 5';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`unable get products: ${err}`);
    }
  }

  async getProductByCategory(category: string): Promise<Array<Product>> {
    try {
      //@ts-ignore
      const conn = await Client.connect();
      const sql = 'SELECT * FROM products WHERE category = ($1)';
      const result = await conn.query(sql, [category]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`unable get products: ${err}`);
    }
  }
}
