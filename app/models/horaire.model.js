const sql = require("./db.js");

const Horaire = function(horaire){
  this.jour = horaire.jour,
  this.heure = horaire.heure
}

Horaire.getAll = result => {
  sql.query("SELECT * FROM horaires", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("horaires: ", res);
    result(null, res);
  });
};

Horaire.create = (newHoraire, result) => {
  sql.query("INSERT INTO horaires SET ?", newHoraire, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created horaire: ", { id: res.insertId, ...newHoraire });
    result(null, { id: res.insertId, ...newHoraire });
  });
};

Horaire.update = (id, horaire, result) => {
  sql.query(
    "UPDATE horaires SET jour = ?, heure = ? WHERE id = ?",
    [horaire.jour, horaire.heure, id],
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

      console.log("updated Horaire: ", { id: id, ...horaire });
      result(null, { id: id, ...horaire });
    }
  );
};

Horaire.remove = (id, result) => {
  sql.query("DELETE FROM horaires WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted horaire with id: ", id);
    result(null, res);
  });
};

Horaire.removeAll = result => {
  sql.query("DELETE FROM horaires", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} horaires`);
    result(null, res);
  });
};

module.exports = Horaire;