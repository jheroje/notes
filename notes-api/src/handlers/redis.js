import client from '../db/client.js';

const service = (ns) => {

  const keys = async () => {
    const keys = await client.keysAsync(`${ns}:*}`);
    return keys;
  }

  const exists = async (id) => {
    const reply = await client.existsAsync(`${ns}:${id}`);
    return reply === 1;
  }

  const get = async (id) => {
    const value = await client.getAsync(`${ns}:${id}`);
    return value;
  }

  const hgetall = async (id) => {
    const value = await client.hgetallAsync(`${ns}:${id}`);
    return value;
  }

  const hgetallList = async () => {
    const values = [];

    const keys = await client.keysAsync(`${ns}:*`);

    for (const key of keys) {
      const value = await client.hgetallAsync(key);
      values.push(value);
    }

    return values;
  }

  return {
    ns,
    keys,
    exists,
    get,
    hgetall,
    hgetallList
  };
}

export default service;