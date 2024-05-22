const multer = require('multer');
const ftp = require('ftp');
const fs = require('fs');
const Animaux = require("../models/animal.model.js");
const upload = multer({ dest: 'uploads/' });

exports.getAll = (req, res) => {
  Animaux.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving data."
      });
    else res.send(data);
  });
};

exports.getAllByHabitat = (req, res) => {
  Animaux.getAllByHabitat(req.params.habitat, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving data."
      });
    else res.send(data);
  });
};

exports.findOneById = (req, res) => {
  Animaux.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found animal with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving animal with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const animal = new Animaux({
    nom: req.body.nom,
    naissance: req.body.naissance,
    alimentation: req.body.alimentation,
    sante: req.body.sante,
    nomScientifique: req.body.nomScientifique,
    descriptionScientifique: req.body.descriptionScientifique,
    image: req.body.image,
    dateVerif: req.body.dateVerif,
  });

  Animaux.create(animal, (err, data) => {
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

  Animaux.update(
    req.params.id,
    new Animaux(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Animal with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Animal with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  Animaux.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Animal with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Animal with id " + req.params.id
        });
      }
    } else res.send({ message: `Animal was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  Animaux.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all animals."
      });
    else res.send({ message: `All animals were deleted successfully!` });
  });
};

exports.addImage = (req, res) => {
  console.log('File received:', req.file);

  upload.single('image')(req, res, (err) => {
    if (err) {
      return res.status(500).send({ message: 'Error uploading file.' });
    }

    const file = req.file;
    if (!file) {
      return res.status(400).send({ message: 'No file uploaded.' });
    }

    const client = new ftp();

    client.on('ready', () => {
      client.put(file.path, `/${file.path}`, (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send({ message: 'Failed to upload to FTP server.' });
        }
        client.end();
        
        fs.unlink(file.path, (unlinkErr) => {
          if (unlinkErr) {
            console.error(unlinkErr);
          }
        });
        res.send({ message: 'File uploaded successfully.' });
      });
    });

    client.connect({
      host: 'ftp-arcadia-images.alwaysdata.net',
      port: 21,
      user: 'arcadia-images_back',
      password: 'motDePasse12',
    });
  });

  
};
