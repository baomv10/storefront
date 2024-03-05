/* eslint-disable @typescript-eslint/ban-ts-comment */
import bcrypt from 'bcrypt';
// @ts-ignore
import Client from '../database';
import { UserCommand, UserViewModel } from '../types/user';

export class UserStore {
  async index(): Promise<Array<UserViewModel>> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = 'SELECT id, first_name, last_name, username FROM users';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get user. ${err}`);
    }
  }

  async show(id: string): Promise<UserViewModel> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql =
        'SELECT id, first_name, last_name, username FROM users WHERE id = ($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${id}. ${err}`);
    }
  }

  async create(u: UserCommand): Promise<UserViewModel> {
    try {
      const saltRounds = process.env.SALT_ROUNDS as string;
      // @ts-ignore
      const conn = await Client.connect();
      const sql =
        'INSERT INTO users (id, first_name, last_name, username, password) VALUES($1, $2, $3, $4, $5) RETURNING id, first_name, last_name, username';
      const hash = bcrypt.hashSync(u.password, parseInt(saltRounds));
      const result = await conn.query(sql, [
        u.id,
        u.first_name,
        u.last_name,
        u.username,
        hash,
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`unable create user: ${err}`);
    }
  }

  async delete(id: string): Promise<UserViewModel> {
    try {
      const sql =
        'DELETE FROM users WHERE id=($1) RETURNING id, first_name, last_name, username';
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not delete user ${id}. ${err}`);
    }
  }

  async authenticate(
    username: string,
    password: string,
  ): Promise<UserViewModel | null> {
    try {
      const sql =
        'SELECT id, first_name, last_name, username, password FROM users WHERE username=($1)';
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sql, [username]);
      if (result.rows.length) {
        const { password: pwd, ...user } = result.rows[0];
        if (bcrypt.compareSync(password, pwd)) {
          return user;
        }
      }
      return null;
    } catch (err) {
      throw new Error(`Could not login. ${err}`);
    }
  }
}
