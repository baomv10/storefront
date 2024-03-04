import express, { Request, Response } from 'express';
import { OrderStore } from '../models/order';
import verifyAuthToken from '../middlewares/jwt';

const store = new OrderStore();

const create = async (req: Request, res: Response) => {
  const { user_id, product_id, quantity, status } = req.body;
  try {
    const result = await store.create({
      id: null,
      user_id,
      product_id,
      quantity,
      status,
    });
    res.json(result);
  } catch (err) {
    res.json(err);
  }
};

const completeOrderByUser = async (req: Request, res: Response) => {
  const userId: string = req.params.userId;
  try {
    const result = await store.completeOrderByUser(userId);
    if (result) {
      res.json('success');
    } else {
      res.status(404).json('Not Found');
    }
  } catch (err) {
    res.json(err);
  }
};

const getOrderByUser = async (req: Request, res: Response) => {
  const userId: string = req.params.userId;
  try {
    const orders = await store.getOrderByUser(userId);
    res.json(orders);
  } catch (err) {
    res.json(err);
  }
};

const orderRoutes = (app: express.Application) => {
  app.get('/orders/:userId', verifyAuthToken, getOrderByUser);
  app.patch(
    '/orders/updateStatus/:userId',
    verifyAuthToken,
    completeOrderByUser,
  );
  app.post('/orders', verifyAuthToken, create);
};

export default orderRoutes;
