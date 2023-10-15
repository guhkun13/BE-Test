const db = require("../models");
const redis = require("redis");

let redisClient = redis.createClient(6379);

const exampleMiddlewareFunction = (req, res, next) => {
  // do something
  next();
};

const verify = {
  exampleMiddlewareFunction: exampleMiddlewareFunction,
};

module.exports = verify;
