const redis = require("ioredis");
const client = redis.createClient({
  url: process.env.REDIS_URL,
});

client.on("connect", () => {
  console.log("Redis connected");
});

client.on("ready", () => {
  console.log("Redis ready");
});

client.on("end", () => {
  console.log("Redis disconnected");
});

client.on("error", (err) => {
  console.log(err.message);
});

client.on("SIGINT", () => {
  client.quit();
});

module.exports = client;
