import { v4 as uuidv4 } from 'uuid';
import { ProductStore } from '../product';

const store = new ProductStore();
describe('Should test Products', () => {
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

  it('should add a product', async () => {
    const id = uuidv4();
    const result = await store.create({
      id,
      name: 'iphone',
      price: 250,
      category: 'phone',
    });

    expect(result.id).toEqual(id);
  });

  it('should return a list of products', async () => {
    const id = uuidv4();
    await store.create({
      id,
      name: 'iphone',
      price: 250,
      category: 'phone',
    });
    const result = await store.index();
    expect(result.length).toBeGreaterThan(0);
  });

  it('should return the correct product', async () => {
    const id = uuidv4();
    await store.create({
      id,
      name: 'iphone',
      price: 250,
      category: 'phone',
    });
    const result = await store.show(id);
    expect(result.id).toEqual(id);
  });

  it('should remove the product', async () => {
    const id = uuidv4();
    const product = await store.create({
      id,
      name: 'iphone',
      price: 250,
      category: 'phone',
    });
    const result = await store.delete(product.id);
    expect(result.id).toEqual(id);
  });
});
