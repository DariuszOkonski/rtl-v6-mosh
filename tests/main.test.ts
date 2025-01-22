/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { it, expect, describe } from 'vitest';

describe('group', () => {
  it('should', () => {
    expect(1).toBe(1);
  });
  it('should call mock service worker', async () => {
    const response = await fetch('/categories');
    const data = await response.json();
    expect(data).toHaveLength(3);
  });
});
