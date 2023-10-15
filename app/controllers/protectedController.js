const db = require("../models/users");

const authenticatedRoleController = (req, res) => {
  res.send({
    statusCode: 200,
    success: true,
    role: role,
    message: "you are authenticated has right to access this resource",
  });
};
const staffFinanceController = (req, res) => {
  res.send({
    statusCode: 200,
    success: true,
    message: "you are authenticated has right to access this resource",
  });
};
const staffHrdController = (req, res) => {
  res.send({
    statusCode: 200,
    success: true,
    message: "you are authenticated has right to access this resource",
  });
};
const adminController = (req, res) => {
  res.send({
    statusCode: 200,
    success: true,
    message: "you are authenticated has right to access this resource",
  });
};

module.exports = {
  authenticatedRoleController,
};
