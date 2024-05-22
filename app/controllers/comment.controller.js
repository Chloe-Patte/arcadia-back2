const Comment = require("../models/comment.model.js");

exports.getComments = (req, res) => {
  Comment.getComments((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving data."
      });
    else res.send(data);
  });
};

exports.getPublishedComments = (req, res) => {
  Comment.getPublishedComments((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving data."
      });
    else res.send(data);
  });
};

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const comment = new Comment({
    pseudo: req.body.pseudo,
    message: req.body.message,
    publie: false,
  });

  Comment.create(comment, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the comment."
      });
    else res.send(data);
  });
};

exports.publish = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Comment.updateComment(req.params.id, new Comment(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found comment with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving comment with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};
