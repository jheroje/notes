'use strict';

import Koa from 'koa';
import Router from 'koa-router';
import cors from '@koa/cors';
import dotenv from 'dotenv';

import { client, getAsync, existsAsync } from './db/client.js';

dotenv.config();

// Constants
const PORT = process.env.PORT || 8080;

// App initialization
const app = new Koa();
const router = new Router();

// Error handler
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    err.status = err.statusCode || err.status || 500;
    ctx.body = err.message;
    ctx.app.emit('Error', err, ctx);
  }
});

router.get('/', async (ctx) => {
  try {
    let visits = await getAsync('visits');

    visits = parseInt(visits) + 1;
    ctx.body = 'Number of visits is: ' + visits;
    
    client.set('visits', visits);
  } catch (error) {
    console.log('Error:' + error);
  }
});

router.get('/notes/:id', async (ctx) => {
  try {  
    const key = 'notes:' + ctx.params.id;
  
    const exists = await existsAsync(key);
  
    if (exists === 1) {
      const note = await getAsync(key);
      ctx.body = 'Note: ' + note;
    } else {
      ctx.body = 'This note doesn\'t exist';
    }
  } catch (error) {
    console.log('Error:' + error);
  }
});

app.use(cors());
app.use(router.routes());
app.use(router.allowedMethods());

// Now listen
app.listen(PORT, () => console.log(`Koa running on port ${PORT}`));