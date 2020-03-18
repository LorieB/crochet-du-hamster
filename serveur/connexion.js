const jwt = require("jsonwebtoken");

module.exports = function (app, connectionBDD) {
    app.post("/connexion", function(req, res) {
        connectionBDD.query("SELECT * FROM utilisateurs WHERE nom = '"+req.body.nom+"' AND mdp = '"+req.body.mdp+"';",
        function(err, rows) {
            if (rows == ''){
                res.status(401).json({message: "Nom ou mdp incorrect"});
            }else{
                let jwtToken = jwt.sign({
                    nom: rows[0]['nom'],
                    id: rows[0]['id']
                }, "longue-clef-secrete");
                res.status(200).json({
                    token: jwtToken
                });
            }
        });
    });
}