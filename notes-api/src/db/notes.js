import { nextValue, getHashProperty, getHash, setHash, getAllHashes } from '../handlers/redis.js';

const ns = 'notes';
const idPattern = '[0-9]*';

const getNote = async (id) => {
  const noteKey = `${ns}:${id}`;

  return await getHash(noteKey);
}

const saveNote = async (note) => {

  if (note.id === undefined) {
    note.id = await nextValue(`${ns}:id`);
  }

  const key = `${ns}:${note.id}`;

  await setHash(key, note);
}

const getAllNotes = async () => {
  const notesPattern = `${ns}:${idPattern}`;

  return await getAllHashes(notesPattern);
}

const getNoteProperty = async (id, property) => {
  const noteKey = `${ns}:${id}`;

  return await getHashProperty(noteKey, property);
}

export { getNote, saveNote, getAllNotes, getNoteProperty };