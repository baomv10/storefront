import supertest from 'supertest';
import app from '../../index';
import { ProductViewModel } from '../../types/product';
import { UserViewModel } from '../../types/user';

const request = supertest(app);
describe('Test Orders api responses', () => {
  let token: string;
  let user: UserViewModel;
  let product: ProductViewModel;
  beforeAll(async () => {
    const payload = {
      firstName: 'John',
      lastName: 'Doe',
      password: 'password',
    };
    const {
      body: { data },
    } = await request.post('/users').send(payload);
    token = data.token;
    user = data.userInfo;

    const phone = {
      name: 'iphone',
      price: 123,
      category: 'phone',
    };
    const response = await request
      .post('/products')
      .send(phone)
      .set('Authorization', `Bearer ${token}`);
    product = response.body.data;
  });
  describe('Should create method', () => {
    it('it should create order successfully', async () => {
      const payload = {
        user_id: user.id,
        status: 'Active',
        order_details: [
          {
            product_id: product.id,
            quantity: 1,
          },
        ],
      };
      const response = await request
        .post('/orders')
        .send(payload)
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
      expect(response.body.data).toBe(true);
    });
    it('it should create order failed', async () => {
      const payload = {};
      const response = await request.post('/orders').send(payload);
      expect(response.status).toBe(401);
    });
  });

  describe('Should get Order By User method', () => {
    beforeAll(async () => {
      const payload = {
        user_id: user.id,
        status: 'Active',
        order_details: [
          {
            product_id: product.id,
            quantity: 1,
          },
        ],
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
      expect(response.body.data.length).toBeGreaterThan(0);
    });
    it('it should Order By User failed', async () => {
      const response = await request
        .get('/orders/1231')
        .set('Authorization', `Bearer ${token}`);
      expect(response.body.data.length).toBe(0);
    });
  });

  describe('Should complete Order By User method', () => {
    beforeAll(async () => {
      const payload = {
        user_id: user.id,
        status: 'Active',
        order_details: [
          {
            product_id: product.id,
            quantity: 1,
          },
        ],
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
      expect(response.body.data).toBe(true);
    });
    it('it should complete Order By User failed', async () => {
      const response = await request
        .patch('/orders/updateStatus/1231')
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(404);
    });
  });
});
