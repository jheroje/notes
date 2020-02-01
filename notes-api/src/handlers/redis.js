import client from '../db/client.js';

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

const getAllHashes = async (pattern) => {
  const keys = await getAllKeys(pattern);
  const values = Promise.all(keys.map(async (key) => await getHash(key)));
  
  return values;
};

export { getAllKeys, exists, getString, getHashProperty, getHash, getAllHashes };