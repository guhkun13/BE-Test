const db = require("../models/users");

const OK_MESSAGE = "you are authenticated & has right to access this resource";

const authenticatedRoleController = (req, res) => {
  const user = req.user;

  res.send({
    statusCode: 200,
    success: true,
    user: user,
    message: OK_MESSAGE,
    url: req.originalUrl,
  });
};

module.exports = {
  authenticatedRoleController,
};
