const express = require("express");
const redis = require("redis");

const app = express();
const client = redis.createClient(6379, "redis-server");
// initialise num of visits to 0
client.set("visits", 0);

app.get("/", (req, res) => {
  client.get("visits", (err, visits) => {
    res.send(`Number of visits is ${visits}`);
    client.set("visits", parseInt(visits) + 1);
  });
});

app.listen(8081, () => {
  console.log("listening on port 8081");
});