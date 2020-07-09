const config = require("../config/auth.config");

const sql = require("../models/db.js");


var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");




exports.signin = (req, res) => {
  sql.query(`SELECT users.id, username, password, GROUP_CONCAT(roles.name) AS roles FROM users ` +
    `INNER JOIN user_roles ON users.id = user_roles.userId ` +
    `INNER JOIN roles ON user_roles.roleId = roles.id ` +
    `WHERE username = '${req.body.nom}' `
    ,
    (err, rows) => {
      if (err) throw err;
      
      if (rows.length == 0) {
        return res.status(404).send({ message: "User Not found." });
      }

      //Test mdp
      var passwordIsValid = bcrypt.compareSync(
        req.body.mdp,
        rows[0].password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: rows[0].id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });


      var authorities = [];

      rows[0].roles = rows[0].roles.split(',');

      rows[0].roles.forEach(role => {
        authorities.push("ROLE_" + role.toUpperCase());
      })


      res.status(200).send({
        id: rows[0].id,
        username: rows[0].username,
        email: rows[0].email,
        roles: authorities,
        accessToken: token
      });

    });
}