import client from '../db/client.js';

const service = (ns) => {
  return {
    ns,
    get: async (id) => {
      const value = await client.getAsync(`${ns}:${id}`);
      return value;
    },
    hgetall: async (id) => {
      const value = await client.hgetallAsync(`${ns}:${id}`);
      return value;
    },
    exists: async (id) => {
      const reply = await client.existsAsync(`${ns}:${id}`);
      return reply === 1;
    }
  };
}

export default service;