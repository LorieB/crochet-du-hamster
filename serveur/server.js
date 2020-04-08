const express = require("express");
const cors = require("cors");
const mysql = require('mysql');
const bodyparser = require('body-parser');
const nodemailer = require('nodemailer');


const app = express();

var corsOptions = {
  origin: ["http://localhost:4200", "http://localhost:4000"]
};


var connectionBDD = mysql.createConnection({
  host: 'localhost',
  user: '',
  password: '',
  database: 'db_crochetdh',
  multipleStatements: true
});
connectionBDD.connect();


app.use(cors(corsOptions));

app.use(bodyparser.json());

let transport = nodemailer.createTransport({
    host: "",
    port: 2525,
    auth: {
      user: "", 
      pass: "" 
  });

app.listen(8000, () => {
  console.log("Bonjour je suis ton serveur");
});

app.get("/", function (request, response) {
  response.send("Coucou node.js");
});


require("./articles.js")(app, connectionBDD);
require("./mail.js")(app, transport);
require("./connexion")(app, connectionBDD);