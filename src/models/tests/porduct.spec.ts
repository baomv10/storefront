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
    const result = await store.create({
      id: null,
      name: 'iphone',
      price: 250,
      category: 'phone',
    });

    expect(result.name).toEqual('iphone');
  });

  it('should return a list of products', async () => {
    await store.create({
      id: null,
      name: 'iphone',
      price: 250,
      category: 'phone',
    });
    const result = await store.index();
    expect(result.length).toBeGreaterThan(0);
  });

  it('should return the correct product', async () => {
    const product = await store.create({
      id: null,
      name: 'iphone',
      price: 250,
      category: 'phone',
    });
    const result = await store.show(product.id + '');

    expect(result.name).toEqual('iphone');
    expect(result.category).toEqual('phone');
    expect(result.price).toEqual(250);
  });

  it('should remove the product', async () => {
    const product = await store.create({
      id: null,
      name: 'iphone',
      price: 250,
      category: 'phone',
    });
    const result = await store.delete(product.id + '');
    expect(result).toEqual(true);
  });
});
