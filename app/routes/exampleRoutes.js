const { exampleMiddleware } = require("../middleware");
const exampleController = require("../controllers/exampleController");

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  const router = require("express").Router();

  router.get(
    "/refactoreMe1",
    [exampleMiddleware.exampleMiddlewareFunction],
    exampleController.refactoreMe1
  );

  router.post(
    "/refactoreMe2",
    [exampleMiddleware.exampleMiddlewareFunction],
    exampleController.refactoreMe2
  );

  router.get("/ws", exampleController.callmeWebSocket);
  router.get("/getData", exampleController.getData);
  router.get("/redis/:search/:id", exampleController.getRedis);

  app.use("/api/data", router);
};
