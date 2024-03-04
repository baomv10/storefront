/* eslint-disable @typescript-eslint/ban-ts-comment */
import bcrypt from 'bcrypt';
// @ts-ignore
import Client from '../database';
import { User } from '../types/user';

export class UserStore {
  async index(): Promise<Array<User>> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = 'SELECT id, first_name, last_name, username FROM users';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get user. Error: ${err}`);
    }
  }

  async show(id: string): Promise<User> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql =
        'SELECT  id, first_name, last_name, username FROM users WHERE id = ($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`);
    }
  }

  async create(u: User): Promise<User> {
    try {
      const saltRounds = process.env.SALT_ROUNDS as string;
      // @ts-ignore
      const conn = await Client.connect();
      const sql =
        'INSERT INTO users (first_name, last_name, username, password) VALUES($1, $2, $3, $4) RETURNING *';
      const hash = bcrypt.hashSync(u.password, parseInt(saltRounds));
      const result = await conn.query(sql, [
        u.first_name,
        u.last_name,
        u.username,
        hash,
      ]);
      const user = result.rows[0];
      conn.release();
      return user;
    } catch (err) {
      throw new Error(`unable create user: ${err}`);
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const sql = 'DELETE FROM users WHERE id=($1)';
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rowCount > 0;
    } catch (err) {
      throw new Error(`Could not delete user ${id}. Error: ${err}`);
    }
  }

  async authenticate(username: string, password: string): Promise<User | null> {
    const sql = 'SELECT password FROM users WHERE username=($1)';
    // @ts-ignore
    const conn = await Client.connect();
    const result = await conn.query(sql, [username]);
    if (result.rows.length) {
      const user = result.rows[0];
      if (bcrypt.compareSync(password, user.password)) {
        return user;
      }
    }
    return null;
  }
}
