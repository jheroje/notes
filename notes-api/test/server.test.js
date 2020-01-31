import request from 'supertest';
import app from '../src/server.js';

test('Notes works', async () => {
  const response = await request(app.callback()).get('/notes/1');
  expect(response.status).toBe(200);
});