const express = require("express");
const cors = require("cors");
const bodyparser = require('body-parser');


const app = express();

var corsOptions = {
  // origin: ["http://localhost:4200", "http://localhost:4000"]
  origin: ["https://crochet-du-hamster.fr", "http://crochet-du-hamster.fr"]
};



app.use(cors(corsOptions));

app.use(bodyparser.json());


app.listen(8000, () => {
  console.log("Bonjour je suis ton serveur");
});



require('./app/routes/articles.routes')(app, express);
require('./app/routes/auth.routes')(app);
require('./app/routes/mail.routes')(app);
