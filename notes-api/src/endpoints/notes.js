import Router from 'koa-router';
import notesService from '../db/notes.js';

const router = new Router({ prefix: '/notes' });

router.get('/:id', async (ctx) => {
  const id = ctx.params.id;

  const exists = await notesService.exists(id);

  if (exists) {
    const note = await notesService.get(id);
    ctx.body = { note };
  } else {
    ctx.body = 'This note doesn\'t exist';
  }
});

export default router;