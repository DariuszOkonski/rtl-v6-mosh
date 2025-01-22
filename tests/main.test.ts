/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { it, expect, describe } from 'vitest';

describe('group', () => {
  it('should', () => {
    expect(1).toBe(1);
  });
  it('should call mock service worker to categories endpoint', async () => {
    const response = await fetch('/categories');
    const data = await response.json();
    expect(data).toHaveLength(3);
  });
  it('should call mock service worker to products endpoint', async () => {
    const response = await fetch('/products');
    const data = await response.json();
    expect(data).toHaveLength(3);
  });
});
