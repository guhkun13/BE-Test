const { authMiddleware } = require("../middleware");
const protectedController = require("../controllers/protectedController");
const router = require("express").Router();

const ROLE_ADMIN = "admin";
const ROLE_STAFF = "staff";
const DIVISION_FINANCE = "finance";
const DIVISION_HRD = "hrd";

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  router.get(
    "/authenticated",
    [authMiddleware.authenticateToken],
    protectedController.authenticatedRoleController
  );

  router.get(
    "/staff/finance",
    [
      authMiddleware.authenticateToken,
      authMiddleware.authenticateRoles([ROLE_ADMIN, ROLE_STAFF]),
      authMiddleware.authenticateDivisions([DIVISION_FINANCE]),
    ],
    protectedController.authenticatedRoleController
  );

  router.get(
    "/staff/hrd",
    [
      authMiddleware.authenticateToken,
      authMiddleware.authenticateRoles([ROLE_ADMIN, ROLE_STAFF]),
      authMiddleware.authenticateDivisions([DIVISION_HRD]),
    ],
    protectedController.authenticatedRoleController
  );

  router.get(
    "/admin",
    [
      authMiddleware.authenticateToken,
      authMiddleware.authenticateRoles([ROLE_ADMIN]),
    ],
    protectedController.authenticatedRoleController
  );

  app.use("/protected/", router);
};
