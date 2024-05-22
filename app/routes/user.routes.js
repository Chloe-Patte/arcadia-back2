module.exports = app => {
  const user = require("../controllers/user.controller.js");

  var router = require("express").Router();

  router.get("/:email", user.login);

  app.use('/user', router);
};
