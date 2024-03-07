import express, { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { OrderStore } from '../models/order';
import verifyAuthToken from '../middlewares/jwt';
import { OrderDetailCommand } from '../types/order';

const store = new OrderStore();

const create = async (req: Request, res: Response) => {
  try {
    const { id = uuidv4(), userId, status, orderDetails } = req.body;

    const params = {
      id,
      userId,
      status,
      orderDetails: orderDetails.map((item: OrderDetailCommand) => ({
        ...item,
        id: uuidv4(),
      })),
    };
    const result = await store.create(params);

    res.status(200).json({
      success: true,
      data: result,
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

const completeOrderByUser = async (req: Request, res: Response) => {
  const userId: string = req.params.userId;
  try {
    const result = await store.completeOrderByUser(userId);
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

const getOrderByUser = async (req: Request, res: Response) => {
  const userId: string = req.params.userId;
  try {
    const orders = await store.getOrderByUser(userId);
    res.status(200).json({
      success: true,
      data: orders,
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
