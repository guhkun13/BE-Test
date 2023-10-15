const { authMiddleware } = require("../middleware");
const protectedController = require("../controllers/protectedController");
const router = require("express").Router();

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

  app.use("/protected/", router);
};
