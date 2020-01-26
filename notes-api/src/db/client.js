import redis from 'redis';
import util from 'util';

// Constants
const REDIS_HOST = process.env.REDIS_HOST || 'redis-db';
const REDIS_PORT = process.env.REDIS_PORT || 6379;

// Client initialization
const client = redis.createClient({
  host: REDIS_HOST,
  port: REDIS_PORT
});

const getAsync = util.promisify(client.get).bind(client);
const existsAsync = util.promisify(client.exists).bind(client);

client.on('connect', () => {
  console.log('Redis client connected');
});

client.on("error", (error) => {
  console.log(`Redis error: ${error}`);
});

client.exists('notes:1', (error, reply) => {
  if (error) {
    console.error(error);
    return;
  }

  if (reply === 0) {
    client.set('notes:1', 'First note!', redis.print);
  }
});

export { client, getAsync, existsAsync };
