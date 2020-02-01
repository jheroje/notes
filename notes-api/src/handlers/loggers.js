const requestLogger = () => async (ctx, next) => {
  console.log('[Koa request]: ', ctx);
  await next();
}

const responseLogger = () => async (ctx, next) => {
  await next();

  const { response: { status, message, body } } = ctx;
  console.log('[Koa response]: ', { status, message, body });
}

export { requestLogger, responseLogger };