var busboy = require('connect-busboy'); //middleware for form/file upload
var path = require('path');     //used for file path
var fs = require('fs-extra');       //File System - for file manipulation
const express = require("express");

module.exports = function (app, connectionBDD) {
    const dossier = 'C:/Users/Moi/my-app/src/assets/images';
    app.use(busboy());
    app.use(express.static(path.join(dossier, 'public')));

    /*
    Se connecte a la BDD pour récupérer la liste des articles ainsi que les url des images associées et leurs descriptions
    Parcour le résultat pour transformer en tableau les listes d'images et de descriptions 
    */
    app.get("/articles", function (request, response) {
        connectionBDD.query(
            'SELECT article.id, titre, texte, prix, dateCreation, GROUP_CONCAT(url ORDER BY url) AS image, GROUP_CONCAT(description) AS descriptionImg FROM article ' +
            'INNER JOIN art_img ON article.id = art_img.fk_id_art ' +
            'INNER JOIN image ON art_img.fk_id_img = image.id ' +
            'GROUP BY article.id ' +
            'ORDER BY dateCreation DESC ;',
            function (err, rows) {
                if (err) throw err;
                rows.forEach(article => {
                    article.image = article.image.split(",");
                    article.descriptionImg = article.descriptionImg.split(",");
                });
                response.send(rows);
            });
    });

    /*
    Récupère un article par son ID ainsi que les url des images associées (triés par ordre alphabetique) et leurs descriptions correspondants 
    Transforme en tableau les listes de matières, images et descriptions 
    */
    app.get("/articles/:id", function (request, response) {
        sql = 'SELECT article.id, titre, texte, prix, porteClef, dispo, categorie.nom AS categorie, GROUP_CONCAT(DISTINCT matiere.nom) AS matiere, GROUP_CONCAT(DISTINCT url  ORDER BY url)AS image, GROUP_CONCAT(DISTINCT description SEPARATOR "|") AS descriptionImg ' +
            'FROM article ' +
            'INNER JOIN art_img ON article.id = art_img.fk_id_art ' +
            'INNER JOIN image ON art_img.fk_id_img = image.id ' +
            'INNER JOIN categorie ON article.id_categorie = categorie.id ' +
            'INNER JOIN art_mat ON article.id = art_mat.fk_id_art ' +
            'INNER JOIN matiere ON matiere.id = fk_id_mat ' +
            'WHERE article.id = ' + request.params.id + ';';
            
        connectionBDD.query(sql, function (err, rows) {
            if (err) throw err;
            rows[0].matiere = rows[0].matiere.split(",");
            rows[0].image = rows[0].image.split(",");
            rows[0].descriptionImg = rows[0].descriptionImg.split("|");

            switch (rows[0].dispo) {
                case 1:
                    rows[0].dispo = 'Disponible';
                    break;
                case 2:
                    rows[0].dispo = 'Non disponible';
                    break;
                case 3:
                    rows[0].dispo = 'Disponible sur commande';
                    break;
            }
            response.send(rows[0]);
        });
    });

    app.get("/matCat", function (request, response) {
        connectionBDD.query(
            'SELECT id, nom FROM matiere;' +
            'SELECT id, nom FROM categorie;',
            function (err, rows) {
                if (err) throw err;
                response.send(rows);
            }
        )
    });

    app.post("/ajout", function (request, response) {
        let idArticle;
        let idImg = [];
        let baseUrl = "../assets/images/";

        let sql = `INSERT INTO article (titre, texte, prix, dateCreation, porteClef, dispo, id_categorie) VALUES ("${request.body.titre}", "${request.body.texte}", ${request.body.prix}, "${request.body.dateCreation}", ${request.body.porteClef}, ${request.body.dispo}, "${request.body.categorie}"); ` + //ajoute le nouvel article
            `SELECT id FROM article WHERE titre = "${request.body.titre}" AND texte = "${request.body.texte}"; ` + // récupère l'id de l'article pour les requetes suivantes
            `INSERT INTO image (nom, url, description) VALUES `;  //ajoute les nouvelles images
        for (let img of request.body.imagesBDD) {
            sql += `("${img.nomImg}", "${baseUrl}${img.nomImg}", "${img.descriptionImg}"),`;
        }
        //supprime la virgule en trop
        sql = sql.slice(0, sql.length - 1);
        sql += `; ` +
            `SELECT id FROM image WHERE `; //récupère les id des nouvelles images pour les requettes suivantes
        for (let img of request.body.imagesBDD) {
            sql += `url = "${baseUrl}${img.nomImg}" OR `;
        }
        //supprime le OR en trop
        sql = sql.slice(0, sql.length - 3);
        sql += `;`;

        connectionBDD.query(sql,
            function (err, rows) {
                if (err) throw err;
                idArticle = rows[1][0].id;
                idImg = rows[3];


                sql2 = "INSERT INTO art_mat (fk_id_art, fk_id_mat) VALUES ";
                for (let mat of request.body.matiere) {
                    sql2 += "(" + idArticle + "," + mat + "),";
                }
                //supprime la virgule en trop
                sql2 = sql2.slice(0, sql2.length - 1);
                sql2 += ";";

                sql2 += "INSERT INTO art_img (fk_id_art, fk_id_img) VALUES ";
                for (let img of idImg) {
                    sql2 += "(" + idArticle + "," + img.id + "),"
                }
                //supprime la virgule en trop
                sql2 = sql2.slice(0, sql2.length - 1);
                sql2 += ";";


                connectionBDD.query(sql2,
                    function (err, rows) {
                        if (err) throw err;
                        response.json('Ajout réussi');
                    });

            });
    })


    app.post("/uploadImg", function (request, response) {
        var fstream;
        request.pipe(request.busboy);
        request.busboy.on('file', function (fieldname, file, filename) {
            fstream = fs.createWriteStream(dossier + "/" + filename);
            file.pipe(fstream);
            fstream.on('close', function () {
                response.json();
            });
        });
    });


    app.get("/suppr/:id", function (request, response) {
        connectionBDD.query(
            'SELECT image.nom FROM image INNER JOIN art_img ON id = fk_id_img WHERE fk_id_art = ' + request.params.id + ';' +
            'DELETE FROM image WHERE id IN (SELECT art_img.fk_id_img FROM art_img WHERE art_img.fk_id_art = ' + request.params.id + ');' +
            'DELETE FROM article WHERE id = ' + request.params.id + ';' +
            'DELETE FROM art_mat WHERE fk_id_art = ' + request.params.id + ';' +
            'DELETE FROM art_img WHERE fk_id_art = ' + request.params.id + ';'
            ,
            function (err, rows) {
                if (err) throw err;
                deleteImg(rows[0]);
                response.json('Suppresion réussi');
            });
    })

    async function deleteImg(images) {
        try {
            for (let img of images) {
                await fs.remove(dossier + "/" + img.nom)
            }
        } catch (err) {
            console.error(err) 
        }
    }

};

