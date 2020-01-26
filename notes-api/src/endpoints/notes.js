import Router from 'koa-router';
import { getAsync, existsAsync } from '../db/client.js';

const router = new Router({prefix: '/notes'});

router.get('/:id', async (ctx) => {
  try {
    const key = 'notes:' + ctx.params.id;

    const exists = await existsAsync(key);

    if (exists === 1) {
      const note = await getAsync(key);
      ctx.body = { note };
    } else {
      ctx.body = 'This note doesn\'t exist';
    }
  } catch (error) {
    console.log(`Error: ${error}`);
  }
});

export default router;