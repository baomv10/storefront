import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UserStore } from '../models/user';
import verifyAuthToken from '../middlewares/jwt';

const store = new UserStore();

const index = async (_: Request, res: Response) => {
  try {
    const users = await store.index();
    res.json(users);
  } catch (err) {
    res.status(400).json(err);
  }
};

const show = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await store.show(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json('Not Found');
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

const remove = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await store.delete(id);
    if (result) {
      res.json('success');
    } else {
      res.status(404).json('Not Found');
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

const create = async (req: Request, res: Response) => {
  const { first_name, last_name, username, password } = req.body;
  try {
    const newUser = await store.create({
      id: null,
      first_name,
      last_name,
      username,
      password,
    });
    const token = jwt.sign(
      { user: newUser },
      process.env.TOKEN_SECRET as string,
    );
    res.json({ token, userInfo: newUser });
  } catch (err) {
    res.status(400).json(err);
  }
};

const authenticate = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = await store.authenticate(username, password);
    if (user) {
      const token = jwt.sign({ user }, process.env.TOKEN_SECRET as string);
      res.json(token);
    } else {
      res.status(401).json('invalid username or password');
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

const userRoutes = (app: express.Application) => {
  app.post('/users', create);
  app.get('/users', verifyAuthToken, index);
  app.get('/users/:id', verifyAuthToken, show);
  app.delete('/users/:id', verifyAuthToken, remove);
  app.post('/users/login', authenticate);
};

export default userRoutes;
