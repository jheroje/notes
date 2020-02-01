import { getHashProperty, getHash, getAllHashes } from '../handlers/redis.js';

const ns = 'notes';
const idPattern = '[0-9]*';

const getNote = async (id) => {
  const noteKey = `${ns}:${id}`;

  return await getHash(noteKey);
}

const getAllNotes = async () => {
  const notesPattern = `${ns}:${idPattern}`;

  return await getAllHashes(notesPattern);
}

const getNoteProperty = async (id, property) => {
  const noteKey = `${ns}:${id}`;

  return await getHashProperty(noteKey, property);
}

export { getNote, getAllNotes, getNoteProperty };