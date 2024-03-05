/* eslint-disable @typescript-eslint/ban-ts-comment */

// @ts-ignore
import Client from '../database';
import { ProductCommand, ProductViewModel } from '../types/product';

export class ProductStore {
  async index(): Promise<Array<ProductViewModel>> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = 'SELECT id, name, price, category FROM products';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get products. ${err}`);
    }
  }

  async show(id: string): Promise<ProductViewModel> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql =
        'SELECT id, name, price, category FROM products WHERE id = ($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find product ${id}. ${err}`);
    }
  }

  async create(product: ProductCommand): Promise<ProductViewModel> {
    try {
      const sql =
        'INSERT INTO products (id, name, price, category) VALUES($1, $2, $3, $4) RETURNING id, name, price, category';
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sql, [
        product.id,
        product.name,
        product.price,
        product.category,
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not add new product ${product.name}. ${err}`);
    }
  }

  async delete(id: string): Promise<ProductViewModel> {
    try {
      const sql =
        'DELETE FROM products WHERE id=($1) RETURNING id, name, price, category';
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not delete product ${id}. ${err}`);
    }
  }

  async topFivePopular(): Promise<Array<ProductViewModel>> {
    try {
      //@ts-ignore
      const conn = await Client.connect();
      const sql = 'SELECT id, name, price, category FROM products LIMIT 5';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`unable get products: ${err}`);
    }
  }

  async getProductByCategory(
    category: string,
  ): Promise<Array<ProductViewModel>> {
    try {
      //@ts-ignore
      const conn = await Client.connect();
      const sql =
        'SELECT id, name, price, category FROM products WHERE category = ($1)';
      const result = await conn.query(sql, [category]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`unable get products: ${err}`);
    }
  }
}
