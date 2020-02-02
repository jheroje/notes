import request from 'supertest';
import app from '../src/server.js';

test('GET /notes works', async () => {
  const response = await request(app.callback()).get('/notes');

  expect(response.status).toBe(200);
});

test('POST /notes works', async () => {
  const note = { id: "1", title: "test", text: "testing text" };
  const response = await request(app.callback()).post('/notes').send(note);

  expect(response.status).toBe(200);
  expect(response.body).toStrictEqual(note);
});

test('POST /notes save new note with id', async () => {
  const note = { title: "test", text: "testing text" };
  const response = await request(app.callback()).post('/notes').send(note);

  expect(response.status).toBe(200);
  expect(response.body.id).toBeDefined();
});