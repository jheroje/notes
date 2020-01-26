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
  console.log(`Redis error: ${error}`);
});

async function init() {
  try {
    const noteInitialized = await client.existsAsync('notes:1');
    
    if (noteInitialized === 0) {
      await client.setAsync('notes:1', 'First note!');
    }
  } catch (error) {
      console.error(error);
  }
}

init();

export default client;
