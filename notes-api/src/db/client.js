import redis from 'redis';

// Constants
const REDIS_HOST = process.env.REDIS_HOST || 'redis-db';
const REDIS_PORT = process.env.REDIS_PORT || 6379;

// Client initialization
const client = redis.createClient({
  host: REDIS_HOST,
  port: REDIS_PORT
});

client.on('connect', function () {
  console.log('Redis client connected');
});

client.exists('visits', (err, reply) => {
  if (err) {
    console.log(err);
    return;
  }

  if (reply === 0) {
    client.set('visits', 0);
  }
});

export default client;
