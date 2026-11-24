import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { createApp } from './app.js';

describe('GET /api/v1/health', () => {
  it('returns 200 and { status: "ok" } without authentication', async () => {
    const response = await request(createApp()).get('/api/v1/health');

    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/application\/json/);
    expect(response.body).toEqual({ status: 'ok' });
  });

  it('is not served outside the /api/v1 prefix', async () => {
    const response = await request(createApp()).get('/health');

    expect(response.status).toBe(404);
  });

  it('does not advertise the framework', async () => {
    const response = await request(createApp()).get('/api/v1/health');

    expect(response.headers['x-powered-by']).toBeUndefined();
  });
});
