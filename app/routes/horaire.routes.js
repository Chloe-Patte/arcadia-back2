module.exports = app => {
  const horaire = require("../controllers/horaire.controller.js");

  var router = require("express").Router();

  router.get("/", horaire.getAll);

  router.post("/", horaire.create);

  router.put("/:id", horaire.update);

  router.delete("/:id", horaire.delete);

  router.delete("/", horaire.deleteAll);

  app.use('/horaire', router);

};