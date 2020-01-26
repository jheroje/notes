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

client.on("error", (err) => {
  console.log("Redis error: " + err);
});

client.exists('visits', (err, reply) => {
  if (err) {
    console.log(err);
    return;
  }

  if (reply === 0) {
    client.set('visits', 0, redis.print);
  }
});

client.exists('notes:1', (err, reply) => {
  if (err) {
    console.error(err);
    return;
  }

  if (reply === 0) {
    client.set('notes:1', 'First note!', redis.print);
  }
});

export {client, getAsync, existsAsync};
