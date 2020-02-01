import Router from 'koa-router';
import { getNote, getAllNotes, saveNote, deleteNote } from '../db/notes.js';

const router = new Router({ prefix: '/notes' });

router.get('/', async (ctx) => {
  const notes = await getAllNotes();

  if (notes && notes.length) {
    ctx.status = 200;
    ctx.body = notes;
  } else {
    ctx.throw(404, 'Not found');
  }
});

router.post('/', async (ctx) => {
  const note = ctx.request.body;
  
  const saved = await saveNote(note);

  if (saved) {
    ctx.status = 200;
    ctx.body = saved;
  } else {
    ctx.throw(503, "Couldn't save the note", note);
  }
});

router.get('/:id', async (ctx) => {
  const id = ctx.params.id;

  const note = await getNote(id);

  if (note) {
    ctx.status = 200;
    ctx.body = note;
  } else {
    ctx.throw(404, 'Not found');
  }
});

router.delete('/:id', async (ctx) => {
  const id = ctx.params.id;

  const reply = await deleteNote(id);
  
  if (reply) {
    ctx.status = 200;
    ctx.body = {id: id};
  } else {
    ctx.throw(404, 'Not found');
  }
});

export default router;