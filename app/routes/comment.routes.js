module.exports = app => {
    const comment = require("../controllers/comment.controller.js");
  
    var router = require("express").Router();
  
    router.get("/", comment.getComments);

    router.get("/published/", comment.getPublishedComments);

    router.post("/", comment.create);

    router.put("/:id", comment.publish);
  
    app.use('/comment', router);
  };
  