import express, { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import verifyAuthToken from '../middlewares/jwt';
import { ProductStore } from '../models/product';

const store = new ProductStore();

const index = async (_: Request, res: Response) => {
  try {
    const products = await store.index();
    res.status(200).json({
      success: true,
      data: products,
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
    const product = await store.show(id);
    if (product) {
      res.status(200).json({
        success: true,
        data: product,
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
  const { id = uuidv4(), name, price, category } = req.body;
  try {
    const product = await store.create({ id, name, price, category });
    res.status(200).json({
      success: true,
      data: product,
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

const topFivePopular = async (_: Request, res: Response) => {
  try {
    const products = await store.topFivePopular();
    res.status(200).json({
      success: true,
      data: products,
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

const getProductByCategory = async (req: Request, res: Response) => {
  const { name } = req.params;
  try {
    const products = await store.getProductByCategory(name);
    res.status(200).json({
      success: true,
      data: products,
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

const productRoutes = (app: express.Application) => {
  app.get('/products', index);
  app.get('/products/topFivePopular', topFivePopular);
  app.get('/products/:id', show);
  app.get('/products/getByCategory/:name', getProductByCategory);
  app.post('/products', verifyAuthToken, create);
  app.delete('/products/:id', verifyAuthToken, remove);
};

export default productRoutes;
