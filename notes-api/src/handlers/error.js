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

export default errorHandler;