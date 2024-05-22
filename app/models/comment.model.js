const sql = require("./db.js");

const Comment = function(comment){
  this.pseudo = comment.pseudo,
  this.message = comment.message,
  this.publie = comment.publie
}

Comment.getComments = result => {
  sql.query("SELECT * FROM commentaires", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("comments: ", res);
    result(null, res);
  });
};

Comment.getPublishedComments = result => {
  sql.query("SELECT * FROM commentaires LIMIT 3", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("comments: ", res);
    result(null, res);
  });
};

Comment.create = (newComment, result) => {
  sql.query("INSERT INTO commentaires SET ?", newComment, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created comment: ", { id: res.insertId, ...newComment });
    result(null, { id: res.insertId, ...newComment });
  });
};

Comment.updateComment = (id, comment, result) => {
  sql.query(
    "UPDATE commentaires SET publie = true WHERE id = ?", [id], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("updated comment: ", { id: id, ...comment });
      result(null, { id: id, ...comment });
    }
  );
};

module.exports = Comment;