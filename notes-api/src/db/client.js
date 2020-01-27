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
  console.log(`[Redis Error]: ${error}`);
});

async function init() {
  try {
    const noteInitialized = await client.existsAsync('notes:1');

    if (noteInitialized === 0) {
      await client.hmsetAsync('notes:1', 'title', 'Hello!', 'text', 'This is the first note stored in redis served through koa and now you are seeing it!');
    }
  } catch (error) {
    console.log(`[Redis Error]: ${error}`);
  }
}

init();

export default client;
