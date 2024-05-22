const sql = require("./db.js");

const Users = function(user) {
  this.id = user.id;
  this.email = user.email;
  this.password = user.password;
};

Users.login = (email, result) => {
  sql.query(`SELECT mdp FROM users WHERE email = "${email}"`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

module.exports = Users;
