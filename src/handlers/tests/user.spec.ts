import supertest from 'supertest';
import app from '../../index';
import { UserViewModel } from '../../types/user';

const request = supertest(app);
describe('Test User api responses', () => {
  describe('Should test create method', () => {
    it('it should create user successfully', async () => {
      const payload = {
        first_name: 'John',
        last_name: 'Doe',
        password: 'password',
        username: 'username',
      };
      const response = await request.post('/users').send(payload);
      expect(response.status).toBe(200);
    });
    it('it should create user failed', async () => {
      const payload = {};
      const response = await request.post('/users').send(payload);
      expect(response.status).toBe(500);
    });
  });

  describe('Should test get all method', () => {
    it('it should get all successfully', async () => {
      const payload = {
        first_name: 'John',
        last_name: 'Doe',
        password: 'password',
        username: 'username',
      };
      const {
        body: {
          data: { token },
        },
      } = await request.post('/users').send(payload);
      const response = await request
        .get('/users')
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
    });
    it('it should get all failed', async () => {
      const response = await request.get('/users');
      expect(response.status).toBe(401);
    });
  });

  describe('Should test get method', () => {
    let token: string;
    let userInfo: UserViewModel;
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
      userInfo = data.userInfo;
    });

    it('it should get successfully', async () => {
      const response = await request
        .get(`/users/${userInfo.id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
      expect(response.body.data.id).toBe(userInfo.id);
    });
    it('it should get all failed', async () => {
      const response = await request
        .get(`/users/231312`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(404);
      expect(response.body.error).toBe('Not Found');
    });
  });

  describe('Should test remove method', () => {
    let token: string;
    let userInfo: UserViewModel;
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
      userInfo = data.userInfo;
    });

    it('it should remove successfully', async () => {
      const response = await request
        .delete(`/users/${userInfo.id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
      expect(response.body.data.id).toBe(userInfo.id);
    });
    it('it should remove all failed', async () => {
      const response = await request
        .delete('/users/112313')
        .set('Authorization', `Bearer ${token}`);
      expect(response.body.error).toBe('Not Found');
      expect(response.status).toBe(404);
    });
  });

  describe('Should test authenticate method', () => {
    beforeAll(async () => {
      const payload = {
        first_name: 'John',
        last_name: 'Doe',
        password: 'password',
        username: 'username',
      };
      await request.post('/users').send(payload);
    });

    it('it should authenticate successfully', async () => {
      const response = await request
        .post(`/users/login`)
        .send({ username: 'username', password: 'password' });
      expect(response.status).toBe(200);
    });
    it('it should authenticate all failed', async () => {
      const response = await request
        .post(`/users/login`)
        .send({ username: 'username1', password: 'password1' });
      expect(response.status).toBe(401);
    });
  });
});
