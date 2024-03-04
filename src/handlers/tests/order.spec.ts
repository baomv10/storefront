import supertest from 'supertest';
import app from '../../index';
import { User } from '../../types/user';
import { Product } from '../../types/product';

const request = supertest(app);
describe('Test Orders api responses', () => {
  let token: string;
  let user: User;
  let product: Product;
  beforeAll(async () => {
    const payload = {
      id: null,
      first_name: 'John',
      last_name: 'Doe',
      password: 'password',
      username: 'username',
    };
    const { body } = await request.post('/users').send(payload);
    token = body.token;
    user = body.userInfo;

    const phone = {
      id: null,
      name: 'iphone',
      price: 123,
      category: 'phone',
    };
    const response = await request
      .post('/products')
      .send(phone)
      .set('Authorization', `Bearer ${token}`);
    product = response.body;
  });
  describe('Should create method', () => {
    it('it should create order successfully', async () => {
      const payload = {
        id: null,
        user_id: user.id,
        product_id: product.id,
        quantity: 23,
        status: 'Active',
      };
      const response = await request
        .post('/orders')
        .send(payload)
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
      expect(response.body.user_id).toBe(user.id);
      expect(response.body.product_id).toBe(product.id);
    });
    it('it should create product failed', async () => {
      const payload = {};
      const response = await request.post('/orders').send(payload);
      expect(response.status).toBe(401);
    });
  });

  describe('Should get Order By User method', () => {
    beforeAll(async () => {
      const payload = {
        id: null,
        user_id: user.id,
        product_id: product.id,
        quantity: 23,
        status: 'Active',
      };
      await request
        .post('/orders')
        .send(payload)
        .set('Authorization', `Bearer ${token}`);
    });
    it('it should get Order By User successfully', async () => {
      const response = await request
        .get(`/orders/${user.id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
      expect(response.body.length).toBeGreaterThan(0);
    });
    it('it should Order By User failed', async () => {
      const response = await request
        .get('/orders/1231')
        .set('Authorization', `Bearer ${token}`);
      expect(response.body.length).toBe(0);
    });
  });

  describe('Should complete Order By User method', () => {
    beforeAll(async () => {
      const payload = {
        id: null,
        user_id: user.id,
        product_id: product.id,
        quantity: 23,
        status: 'Active',
      };
      await request
        .post('/orders')
        .send(payload)
        .set('Authorization', `Bearer ${token}`);
    });
    it('it should complete Order By User successfully', async () => {
      const response = await request
        .patch(`/orders/updateStatus/${user.id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
      expect(response.body).toBe('success');
    });
    it('it should complete Order By User failed', async () => {
      const response = await request
        .patch('/orders/updateStatus/1231')
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(404);
    });
  });
});
