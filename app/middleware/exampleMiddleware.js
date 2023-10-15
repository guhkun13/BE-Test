const db = require("../models");

const exampleMiddlewareFunction = (req, res, next) => {
  // do something
  next();
};

const verify = {
  exampleMiddlewareFunction: exampleMiddlewareFunction,
};

module.exports = verify;
