import Koa from 'koa';
import Router from 'koa-router';
import cors from '@koa/cors';
import helmet from 'koa-helmet';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import dotenv from 'dotenv';

import notesRouter from './endpoints/notes.js';
import errorHandler from './handlers/error.js';

dotenv.config();

// Constants
const PORT = process.env.PORT || 8080;

// App initialization
const app = new Koa();
app.use(logger());

// Router
const router = new Router();
router.use(notesRouter.routes(), notesRouter.allowedMethods());

// Error handler
app.use(errorHandler());

app.on('error', (error, ctx) => {
  console.log(`[Koa Error]: ${error}`);
});

//Configuration
app.use(helmet());
app.use(bodyParser());
app.use(cors());
app.use(router.routes());
app.use(router.allowedMethods());

// Now listen
app.listen(PORT, () => console.log(`Koa running on port ${PORT}`));