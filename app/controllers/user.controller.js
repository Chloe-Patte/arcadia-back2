const Users = require("../models/user.model.js");

exports.login = (req, res) => {
  Users.login(req.params.email, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found animal with id ${req.params.email}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving animal with id " + req.params.email
        });
      }
    } else res.send(data);
  });
};
