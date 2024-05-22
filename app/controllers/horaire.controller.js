const Horaire = require("../models/horaire.model.js");

exports.getAll = (req, res) => {
  Horaire.getAll((err, data) => {
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

  const horaire = new Horaire({
    jour: req.body.jour,
    heure: req.body.heure,
  });

  Horaire.create(horaire, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the animal."
      });
    else res.send(data);
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Horaire.update(
    req.params.id,
    new Horaire(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Horaire with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Horaire with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  Horaire.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Horaire with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Horaire with id " + req.params.id
        });
      }
    } else res.send({ message: `Horaire was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  Horaire.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all horaires."
      });
    else res.send({ message: `All horaires were deleted successfully!` });
  });
};