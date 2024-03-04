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
    const product = await productStore.create({
      id: null,
      name: 'iphone',
      price: 250,
      category: 'phone',
    });
    const user = await userStore.create({
      id: null,
      first_name: 'John',
      last_name: 'Doe',
      username: 'username',
      password: 'password',
    });
    const result = await orderStore.create({
      id: null,
      user_id: user.id,
      product_id: product.id,
      quantity: 250,
      status: 'Active',
    });

    expect(result.user_id).toEqual(user.id);
    expect(result.product_id).toEqual(product.id);
    expect(result.quantity).toEqual(250);
  });

  it('should get Order By User', async () => {
    const product = await productStore.create({
      id: null,
      name: 'iphone',
      price: 250,
      category: 'phone',
    });
    const user = await userStore.create({
      id: null,
      first_name: 'John',
      last_name: 'Doe',
      username: 'username',
      password: 'password',
    });
    await orderStore.create({
      id: null,
      user_id: user.id,
      product_id: product.id,
      quantity: 250,
      status: 'Active',
    });
    const result = await orderStore.getOrderByUser(user.id + '');
    expect(result.length).toEqual(1);
    expect(result[0].status).toEqual('Active');
    expect(result[0].product_name).toEqual('iphone');
    expect(result[0].quantity).toEqual(250);
  });

  it('should complete Order By User', async () => {
    const product = await productStore.create({
      id: null,
      name: 'iphone',
      price: 250,
      category: 'phone',
    });
    const user = await userStore.create({
      id: null,
      first_name: 'John',
      last_name: 'Doe',
      username: 'username',
      password: 'password',
    });

    await orderStore.create({
      id: null,
      user_id: user.id,
      product_id: product.id,
      quantity: 250,
      status: 'Active',
    });
    const result = await orderStore.completeOrderByUser(user.id + '');
    expect(result).toEqual(true);
  });
});
