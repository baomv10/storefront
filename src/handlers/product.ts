import express, { Request, Response } from 'express';
import verifyAuthToken from '../middlewares/jwt';
import { ProductStore } from '../models/product';

const store = new ProductStore();

const index = async (_: Request, res: Response) => {
  try {
    const products = await store.index();
    res.json(products);
  } catch (err) {
    res.json(err);
  }
};

const show = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const product = await store.show(id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json('Not Found');
    }
  } catch (err) {
    res.json(err);
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
    res.json(err);
  }
};

const create = async (req: Request, res: Response) => {
  const { name, price, category } = req.body;
  try {
    const product = await store.create({ id: null, name, price, category });
    res.json(product);
  } catch (err) {
    res.json(err);
  }
};

const topFivePopular = async (_: Request, res: Response) => {
  try {
    const products = await store.topFivePopular();
    res.json(products);
  } catch (err) {
    res.json(err);
  }
};

const getProductByCategory = async (req: Request, res: Response) => {
  const { name } = req.params;
  try {
    const products = await store.getProductByCategory(name);
    res.json(products);
  } catch (err) {
    res.json(err);
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
