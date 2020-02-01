import client from '../db/client.js';

const nextValue = async (key) => {
  return await client.incrAsync(key);
};

const getAllKeys = async (pattern) => {
  const keys = await client.keysAsync(pattern);
  return keys;
};

const exists = async (key) => {
  const reply = await client.existsAsync(key);
  return reply === 1;
};

const getString = async (key) => {
  const value = await client.getAsync(key);
  return value;
};

const getHashProperty = async (key, property) => {
  const value = await client.hgetAsync(key);
  return value;
};

const getHash = async (key) => {
  const value = await client.hgetallAsync(key);
  return value;
};

const setHash = async (key, hash) => {
  const entries = Object.entries(hash).flat();
  return await client.hmsetAsync(key, ...entries);
};

const getAllHashes = async (pattern) => {
  const keys = await getAllKeys(pattern);
  const values = Promise.all(keys.map(async (key) => await getHash(key)));
  
  return values;
};

const remove = async (key) => {
  return await client.delAsync(key);
};

export { nextValue, getAllKeys, exists, getString, getHashProperty, getHash, setHash, getAllHashes, remove };