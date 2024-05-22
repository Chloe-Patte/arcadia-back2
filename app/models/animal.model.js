const { connection } = require("mongoose");
const sql = require("./db.js");

const Animaux = function(animal){
  this.id = animal.id,
  this.nom = animal.nom,
  this.naissance = animal.naissance,
  this.alimentation = animal.alimentation,
  this.sante = animal.sante,
  this.nomScientifique = animal.nomScientifique,
  this.descriptionScientifique = animal.descriptionScientifique,
  this.image = animal.image,
  this.dateVerif = animal.dateVerif
}

Animaux.getAll = result => {
  sql.query("SELECT * FROM animaux", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("animaux: ", res);
    result(null, res);
  });
};

Animaux.getAllByHabitat = (habitat, result) => {
  sql.query(`SELECT * FROM animaux WHERE habitat = "${habitat}"`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found animal: ", res);
      result(null, res);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Animaux.findById = (id, result) => {
  sql.query(`SELECT * FROM animaux WHERE id = ${id}`, async (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found animal: ", res[0]);
      result(null, res[0]);
    }

    let collection = connection.collection("animals");
    let query = {nom: res[0].nom};
    let result2 = await collection.findOne(query);
    if (!result2) res.send("Not found").status(404);
    else {
      console.log(result2)
    };

    let count = result2.onClick;
    count = count +1;

    const updates = {
      $set: { onClick: count }
    };
    await collection.updateOne(query, updates);
    return;
  });
};

Animaux.create = (newAnimal, result) => {
  sql.query("INSERT INTO animaux SET ?", newAnimal, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created animal: ", { id: res.insertId, ...newAnimal });
    result(null, { id: res.insertId, ...newAnimal });
  });
};

Animaux.update = (id, animal, result) => {
  sql.query(
    "UPDATE animaux SET nom = ?, naissance = ?, alimentation = ?, sante = ?, habitat = ?, nomScientifique = ?, descriptionScientifique = ?, image = ?, dateVerif = ? WHERE id = ?",
    [animal.nom, animal.naissance, animal.alimentation, animal.sante, animal.habitat, animal.nomScientifique, animal.descriptionScientifique, animal.image, animal.dateVerif, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Animal: ", { id: id, ...animal });
      result(null, { id: id, ...animal });
    }
  );
};

Animaux.remove = (id, result) => {
  sql.query("DELETE FROM animaux WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted animal with id: ", id);
    result(null, res);
  });
};

Animaux.removeAll = result => {
  sql.query("DELETE FROM animaux", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} animals`);
    result(null, res);
  });
};

module.exports = Animaux;