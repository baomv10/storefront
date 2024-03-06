import { v4 as uuidv4 } from 'uuid';
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
    const id = uuidv4();
    const result = await store.create({
      id,
      firstName: 'John',
      lastName: 'Doe',
      password: 'password',
    });
    expect(result.id).toEqual(id);
  });

  it('should return a list of users', async () => {
    const id = uuidv4();
    await store.create({
      id,
      firstName: 'John',
      lastName: 'Doe',
      password: 'password',
    });
    const result = await store.index();
    expect(result.length).toBeGreaterThan(0);
  });

  it('should return the correct user', async () => {
    const id = uuidv4();
    await store.create({
      id,
      firstName: 'John',
      lastName: 'Doe',
      password: 'password',
    });
    const result = await store.show(id);
    expect(result.id).toEqual(id);
  });

  it('should remove the user', async () => {
    const id = uuidv4();
    await store.create({
      id,
      firstName: 'John',
      lastName: 'Doe',
      password: 'password',
    });
    const result = await store.delete(id);
    expect(result.id).toEqual(id);
  });
});
