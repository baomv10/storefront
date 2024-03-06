import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { UserStore } from '../models/user';
import verifyAuthToken from '../middlewares/jwt';

const store = new UserStore();

const index = async (_: Request, res: Response) => {
  try {
    const users = await store.index();
    res.status(200).json({
      success: true,
      data: users,
      error: null,
    });
  } catch (err) {
    res.status(500);
    if (err instanceof Error) {
      res.json({
        success: false,
        data: null,
        error: err.message,
      });
    }
  }
};

const show = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await store.show(id);
    if (user) {
      res.status(200).json({
        success: true,
        data: user,
        error: null,
      });
    } else {
      res.status(404).json({
        success: false,
        data: null,
        error: 'Not Found',
      });
    }
  } catch (err) {
    res.status(500);
    if (err instanceof Error) {
      res.json({
        success: false,
        data: null,
        error: err.message,
      });
    }
  }
};

const remove = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await store.delete(id);
    if (result) {
      res.status(200).json({
        success: true,
        data: result,
        error: null,
      });
    } else {
      res.status(404).json({
        success: false,
        data: null,
        error: 'Not Found',
      });
    }
  } catch (err) {
    res.status(500);
    if (err instanceof Error) {
      res.json({
        success: false,
        data: null,
        error: err.message,
      });
    }
  }
};

const create = async (req: Request, res: Response) => {
  const { id = uuidv4(), firstName, lastName, password } = req.body;
  try {
    const newUser = await store.create({
      id,
      firstName,
      lastName,
      password,
    });
    const token = jwt.sign(
      { user: newUser },
      process.env.TOKEN_SECRET as string,
    );
    res.status(200).json({
      success: true,
      data: { token, userInfo: newUser },
      error: null,
    });
  } catch (err) {
    res.status(500);
    if (err instanceof Error) {
      res.json({
        success: false,
        data: null,
        error: err.message,
      });
    }
  }
};


const userRoutes = (app: express.Application) => {
  app.post('/users', create);
  app.get('/users', verifyAuthToken, index);
  app.get('/users/:id', verifyAuthToken, show);
  app.delete('/users/:id', verifyAuthToken, remove);
};

export default userRoutes;
