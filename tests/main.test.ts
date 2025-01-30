/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { it, expect, describe } from 'vitest';
import { faker } from '@faker-js/faker';
import { db } from './mocks/db';

describe('faker', () => {
  it('should', () => {
    const product = db.product.create({ name: 'Apple' });

    console.log(product);
    console.log({
      name: faker.commerce.productName(),
      price: faker.commerce.price({ min: 1, max: 100 }),
    });
  });
});

describe('group', () => {
  it('should', () => {
    expect(1).toBe(1);
  });
  it.skip('should call mock service worker to categories endpoint', async () => {
    const response = await fetch('/categories');
    const data = await response.json();
    expect(data).toHaveLength(3);
  });
  it.skip('should call mock service worker to products endpoint', async () => {
    const response = await fetch('/products');
    const data = await response.json();
    expect(data).toHaveLength(3);
  });
});
