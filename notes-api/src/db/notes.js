import { nextValue, getHashProperty, getHash, setHash, getAllHashes, remove } from '../handlers/redis.js';

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

  return await setHash(key, note);
}

const deleteNote = async (id) => {
  const noteKey = `${ns}:${id}`;

  return await remove(noteKey);
}

const getAllNotes = async () => {
  const notesPattern = `${ns}:${idPattern}`;

  return await getAllHashes(notesPattern);
}

const getNoteProperty = async (id, property) => {
  const noteKey = `${ns}:${id}`;

  return await getHashProperty(noteKey, property);
}

export { getNote, saveNote, deleteNote, getAllNotes, getNoteProperty };