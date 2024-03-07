import { v4 as uuidv4 } from 'uuid';
import { OrderStore } from '../order';
import { ProductStore } from '../product';
import { UserStore } from '../user';

const orderStore = new OrderStore();
const productStore = new ProductStore();
const userStore = new UserStore();

describe('Should test Orders', () => {
  it('should have an create method', () => {
    expect(orderStore.create).toBeDefined();
  });
  it('should have an completeOrderByUser method', () => {
    expect(orderStore.completeOrderByUser).toBeDefined();
  });
  it('should have an getOrderByUser method', () => {
    expect(orderStore.getOrderByUser).toBeDefined();
  });

  it('should add a order', async () => {
    const productId = uuidv4();
    const userId = uuidv4();
    const orderId = uuidv4();
    await productStore.create({
      id: productId,
      name: 'iphone',
      price: 250,
      category: 'phone',
    });
    await userStore.create({
      id: userId,
      firstName: 'John',
      lastName: 'Doe',
      password: 'password',
    });
    const result = await orderStore.create({
      id: orderId,
      userId: userId,
      status: 'Active',
      orderDetails: [
        {
          id: orderId,
          productId: productId,
          quantity: 2,
        },
      ],
    });

    expect(result).toEqual(true);
  });

  it('should get Order By User', async () => {
    const productId = uuidv4();
    const userId = uuidv4();
    const orderId = uuidv4();
    await productStore.create({
      id: productId,
      name: 'iphone',
      price: 250,
      category: 'phone',
    });
    await userStore.create({
      id: userId,
      firstName: 'John',
      lastName: 'Doe',
      password: 'password',
    });
    await orderStore.create({
      id: orderId,
      userId: userId,
      status: 'Active',
      orderDetails: [
        {
          id: orderId,
          productId: productId,
          quantity: 2,
        },
      ],
    });
    const result = await orderStore.getOrderByUser(userId);
    expect(result.length).toBeGreaterThan(0);
  });

  it('should complete Order By User', async () => {
    const productId = uuidv4();
    const userId = uuidv4();
    const orderId = uuidv4();
    await productStore.create({
      id: productId,
      name: 'iphone',
      price: 250,
      category: 'phone',
    });
    await userStore.create({
      id: userId,
      firstName: 'John',
      lastName: 'Doe',
      password: 'password',
    });
    await orderStore.create({
      id: orderId,
      userId: userId,
      status: 'Active',
      orderDetails: [
        {
          id: orderId,
          productId: productId,
          quantity: 2,
        },
      ],
    });
    const result = await orderStore.completeOrderByUser(userId);
    expect(result).toEqual(true);
  });
});
