module.exports = app => {
  const animal = require("../controllers/animal.controller.js");

  var router = require("express").Router();

  router.get("/", animal.getAll);

  router.get("/habitat/:habitat", animal.getAllByHabitat);

  router.get("/:id", animal.findOneById);

  router.post("/", animal.create);
  router.post("/upload/", animal.addImage);

  router.put("/:id", animal.update);

  router.delete("/:id", animal.delete);

  router.delete("/", animal.deleteAll);  

  app.use('/animal', router);
};
