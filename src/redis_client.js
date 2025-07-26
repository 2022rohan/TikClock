import IoRedis from 'ioredis';
const connection = new IoRedis();

console.log("Redis client initialized");
export default connection;