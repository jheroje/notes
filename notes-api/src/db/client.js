import redis from 'redis';
import bluebird from 'bluebird';

// async await all the way
bluebird.promisifyAll(redis);

// Constants
const REDIS_HOST = process.env.REDIS_HOST || 'redis-db';
const REDIS_PORT = process.env.REDIS_PORT || 6379;

// Client initialization
const client = redis.createClient({
  host: REDIS_HOST,
  port: REDIS_PORT
});

client.on('connect', () => {
  console.log('Redis client connected');
});

client.on("error", (error) => {
  console.error('[Redis Error]: ', error);
});

export default client;
