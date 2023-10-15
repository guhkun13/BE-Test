const db = require("../models");
const jwt = require("jsonwebtoken");
const configJwt = require("../config/jwt");

const ROLE_ADMIN = "admin";
const ROLE_STAFF = "staff";

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, configJwt.TOKEN_SECRET, (err, user) => {
    console.log(err);
    if (err) return res.sendStatus(403);

    req.user = user;
    next();
  });
};

const authenticateRoles = (roles) => {

  return (req, res, next) => {

    if (roles.includes(req.user.role)) {
      if (req.user.role == ROLE_ADMIN) {
        // skip division
        req.skipAuthenticateDivisions = true;
      }
      next();
    } else {
      return res.sendStatus(403);
    }
  };
};

const authenticateDivisions = (divisions) => {
  return (req, res, next) => {
    if (req.skipAuthenticateDivisions) {
      next();
    }

    if (divisions.includes(req.user.division)) {
      next();
    } else {
      return res.sendStatus(403);
    }
  };
};

module.exports = {
  authenticateToken,
  authenticateRoles,
  authenticateDivisions,
};
