import Koa from 'koa';
import Router from 'koa-router';
import cors from '@koa/cors';
import helmet from 'koa-helmet';
import dotenv from 'dotenv';

import notesRouter from './endpoints/notes.js';

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
  } catch (error) {
    error.status = error.statusCode || error.status || 500;
    ctx.body = error.message;
    ctx.app.emit('Error', error, ctx);
  }
});

router.use(notesRouter.routes(), notesRouter.allowedMethods());

app.use(cors());
app.use(helmet());
app.use(router.routes());
app.use(router.allowedMethods());

// Now listen
app.listen(PORT, () => console.log(`Koa running on port ${PORT}`));