import { UserStore } from '../user';

const store = new UserStore();

describe('Should test Users', () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });
  it('should have an create method', () => {
    expect(store.create).toBeDefined();
  });

  it('should have an show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have an delete method', () => {
    expect(store.delete).toBeDefined();
  });

  it('should add a user', async () => {
    const result = await store.create({
      id: null,
      first_name: 'John',
      last_name: 'Doe',
      password: 'password',
      username: 'username',
    });
    expect(result.first_name).toEqual('John');
    expect(result.last_name).toEqual('Doe');
    expect(result.username).toEqual('username');
  });

  it('should return a list of users', async () => {
    await store.create({
      id: null,
      first_name: 'John',
      last_name: 'Doe',
      password: 'password',
      username: 'username',
    });
    const result = await store.index();

    expect(result.length).toBeGreaterThan(0);
    expect(result[0].first_name).toEqual('John');
    expect(result[0].last_name).toEqual('Doe');
    expect(result[0].username).toEqual('username');
  });

  it('should return the correct user', async () => {
    const user = await store.create({
      id: null,
      first_name: 'John',
      last_name: 'Doe',
      password: 'password',
      username: 'username',
    });
    const result = await store.show(user.id + '');
    expect(result.first_name).toEqual('John');
    expect(result.last_name).toEqual('Doe');
    expect(result.username).toEqual('username');
  });

  it('should remove the user', async () => {
    const user = await store.create({
      id: null,
      first_name: 'John',
      last_name: 'Doe',
      password: 'password',
      username: 'username',
    });
    const result = await store.delete(user.id + '');
    expect(result).toEqual(true);
  });
});
