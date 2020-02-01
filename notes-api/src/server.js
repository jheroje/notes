import Koa from 'koa';
import Router from 'koa-router';
import cors from '@koa/cors';
import helmet from 'koa-helmet';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import http2 from 'http2';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

import notesRouter from './endpoints/notes.js';
import { errorHandler, errorListener } from './handlers/error.js';
import { requestLogger, responseLogger } from './handlers/loggers.js';

dotenv.config();

const __dirname = path.resolve();

// Constants
const PORT = process.env.PORT || 8080;

// App initialization
const app = new Koa();
app.use(logger());

// Error handler
app.use(errorHandler());

// Loggers for debugging
// app.use(requestLogger());
app.use(responseLogger());

app.on('error', errorListener());

// Router
const router = new Router();
router.use(notesRouter.routes(), notesRouter.allowedMethods());

// Configuration
app.use(helmet());
app.use(bodyParser());
app.use(cors());
app.use(router.routes());
app.use(router.allowedMethods());

// Certs
const options = {
  key: fs.readFileSync(path.join(__dirname, '/privateKey.key')),
  cert: fs.readFileSync(path.join(__dirname, '/certificate.crt')),
  allowHTTP1: true
}

// Now listen
http2.createSecureServer(options, app.callback()).listen(PORT, () => console.log(`Koa running on port ${PORT}`));

export default app;