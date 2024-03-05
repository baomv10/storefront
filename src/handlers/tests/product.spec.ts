import supertest from 'supertest';
import app from '../../index';

const request = supertest(app);
describe('Test Product api responses', () => {
  let token: string;
  beforeAll(async () => {
    const payload = {
      first_name: 'John',
      last_name: 'Doe',
      password: 'password',
      username: 'username',
    };
    const {
      body: { data },
    } = await request.post('/users').send(payload);
    token = data.token;
  });
  describe('Should create method', () => {
    it('it should create product successfully', async () => {
      const payload = {
        name: 'iphone',
        price: 123,
        category: 'phone',
      };
      const response = await request
        .post('/products')
        .send(payload)
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
    });
    it('it should create product failed', async () => {
      const payload = {};
      const response = await request.post('/products').send(payload);
      expect(response.status).toBe(401);
    });
  });

  describe('Should get method', () => {
    it('it should get successfully', async () => {
      const payload = {
        name: 'iphone',
        price: 123,
        category: 'phone',
      };
      const {
        body: { data: product },
      } = await request
        .post('/products')
        .send(payload)
        .set('Authorization', `Bearer ${token}`);

      const response = await request.get(`/products/${product.id}`);
      expect(response.status).toBe(200);
      expect(response.body.data.id).toBe(product.id);
    });
    it('it should get failed', async () => {
      const response = await request.get('/products/123456');
      expect(response.status).toBe(404);
    });
  });

  describe('Should remove method', () => {
    it('it should remove successfully', async () => {
      const payload = {
        name: 'iphone',
        price: 123,
        category: 'phone',
      };
      const {
        body: { data: product },
      } = await request
        .post('/products')
        .send(payload)
        .set('Authorization', `Bearer ${token}`);
      const response = await request
        .delete(`/products/${product.id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
      expect(response.body.data.id).toBe(product.id);
    });
    it('it should remove all failed', async () => {
      const response = await request
        .delete('/products/112313')
        .set('Authorization', `Bearer ${token}`);
      expect(response.body.error).toBe('Not Found');
      expect(response.status).toBe(404);
    });
  });

  describe('Should get top Five Popular method', () => {
    it('it should get top Five Popular successfully', async () => {
      const payload = {
        name: 'iphone',
        price: 123,
        category: 'phone',
      };
      await request
        .post('/products')
        .send(payload)
        .set('Authorization', `Bearer ${token}`);
      const response = await request.get(`/products/topFivePopular`);
      expect(response.status).toBe(200);
      expect(response.body.data.length).toBeGreaterThan(0);
    });
  });

  describe('Should get Product By Category method', () => {
    it('it should get Product By Category successfully', async () => {
      const payload = {
        name: 'iphone',
        price: 123,
        category: 'phone',
      };
      await request
        .post('/products')
        .send(payload)
        .set('Authorization', `Bearer ${token}`);
      const response = await request.get(`/products/getByCategory/phone`);
      expect(response.status).toBe(200);
      expect(response.body.data.length).toBeGreaterThan(0);
    });
  });
});
