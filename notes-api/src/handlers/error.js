import redis from 'redis';

const errorHandler = () => async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    error.status = error.statusCode || error.status || 500;
    ctx.body = error.message;
    ctx.app.emit('Error', error, ctx);
    throw error;
  }
}

const errorListener = () => async (error, ctx) => {
  if (error instanceof redis.RedisError) {
    console.error('[Redis Error]: ', error);
  } else {
    console.error('[Koa Error]: ', error);
  }
}

export { errorHandler, errorListener };