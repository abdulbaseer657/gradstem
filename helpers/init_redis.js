const redis = require("ioredis");
const client = redis.createClient({
  url: "rediss://red-cjjohb7jbvhs73ao1a1g:rSe4d5Bhavc7fGdq9XXIteSR4YMgqFqi@oregon-redis.render.com:6379",
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
