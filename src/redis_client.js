import IoRedis from 'ioredis';
const connection = new IoRedis({ maxRetriesPerRequest: null,});

console.log("Redis client initialized");
export default connection;