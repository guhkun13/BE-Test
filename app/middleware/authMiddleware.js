const db = require("../models");
const jwt = require("jsonwebtoken");
const configJwt = require("../config/jwt");

const ROLE_ADMIN = "admin";
const ROLE_STAFF = "staff";
const ERR_PERMISSION_DENIED = "Permission denied";

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  let token = null;
  if (authHeader) {
    token = authHeader.split(" ")[1];
  }

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, configJwt.TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(401);

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
      return res.status(403).json({
        statusCode: 403,
        message: ERR_PERMISSION_DENIED,
      });
    }
  };
};

const authenticateDivisions = (divisions) => {
  return (req, res, next) => {
    if (req.skipAuthenticateDivisions) {
      return next();
    }

    if (divisions.includes(req.user.division)) {
      next();
    } else {
      return res.status(403).json({
        statusCode: 403,
        message: ERR_PERMISSION_DENIED,
      });
    }
  };
};

module.exports = {
  authenticateToken,
  authenticateRoles,
  authenticateDivisions,
};
