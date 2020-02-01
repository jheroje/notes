import Router from 'koa-router';
import { getNote, getAllNotes } from '../db/notes.js';

const router = new Router({ prefix: '/notes' });

router.get('/', async (ctx) => {
    const notes = await getAllNotes();
    ctx.body = notes;
});

router.get('/:id', async (ctx) => {
  const id = ctx.params.id;

  const note = await getNote(id);

  ctx.body = note !== null ? note : 'This note doesn\'t exist';
});

export default router;