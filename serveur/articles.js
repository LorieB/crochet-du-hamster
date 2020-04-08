var busboy = require('connect-busboy'); //middleware for form/file upload
var path = require('path');     //used for file path
var fs = require('fs-extra');       //File System - for file manipulation
const express = require("express");

module.exports = function (app, connectionBDD) {
    const dossier = '/assets/images';
    app.use(busboy());
    app.use(express.static(path.join(dossier, 'public')));

    /*
    Récupére la liste des articles ainsi que les url des images associées et leurs descriptions
    Parcour le résultat pour transformer en tableau les listes d'images, descriptions, matières et matières id
    */
    app.get("/articles", function (request, response) {
        connectionBDD.query(
            'SELECT article.id, categorie.id AS categorieID, GROUP_CONCAT(DISTINCT matiere.id) AS matiereID, titre, texte, prix, DATE_FORMAT(dateCreation, "%Y-%m-%d") AS dateCreation, porteClef, dispo, categorie.nom AS categorie, GROUP_CONCAT(DISTINCT matiere.nom) AS matiere, GROUP_CONCAT(DISTINCT image.nom  ORDER BY image.nom)AS image, GROUP_CONCAT(DISTINCT description SEPARATOR "|") AS descriptionImg ' +
            'FROM article ' +
            'INNER JOIN image ON article.id = image.id_article ' +
            'INNER JOIN categorie ON article.id_categorie = categorie.id ' +
            'INNER JOIN art_mat ON article.id = art_mat.fk_id_art ' +
            'INNER JOIN matiere ON matiere.id = fk_id_mat ' +
            'GROUP BY article.id ' +
            'ORDER BY article.dateCreation DESC ;',
            function (err, rows) {
                if (err) throw err;
                rows.forEach(article => {
                    article.matiere = article.matiere.split(",");
                    article.matiereID = article.matiereID.split(",");
                    article.image = article.image.split(",");
                    article.descriptionImg = article.descriptionImg.split("|");
                });
                response.send(rows);
            });
    });

    /*
    Récupère un article par son ID ainsi que les url des images associées (triés par ordre alphabetique) et leurs descriptions correspondants 
    Transforme en tableau les listes de matières, images et descriptions 
    */
    app.get("/articles/:id", function (request, response) {
        sql = 'SELECT article.id, titre, texte, prix, porteClef, dispo, categorie.nom AS categorie, GROUP_CONCAT(DISTINCT matiere.nom) AS matiere, GROUP_CONCAT(DISTINCT image.nom  ORDER BY image.nom)AS image, GROUP_CONCAT(DISTINCT description SEPARATOR "|") AS descriptionImg ' +
            'FROM article ' +
            'INNER JOIN image ON article.id = image.id_article ' +
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

    /* Récupère la liste des categories, matières et leurs id */
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

    /* Insère un nouvel article en BDD */
    app.post("/ajout", function (request, response) {
        let idArticle;

        let sql = `INSERT INTO article (titre, texte, prix, dateCreation, porteClef, dispo, id_categorie) VALUES ("${request.body.titre}", "${request.body.texte}", ${request.body.prix}, "${request.body.dateCreation}", ${request.body.porteClef}, ${request.body.dispo}, "${request.body.categorie}"); ` + //ajoute le nouvel article
            `SELECT id FROM article WHERE titre = "${request.body.titre}" AND texte = "${request.body.texte}"; ` // récupère l'id de l'article pour les requetes suivantes

        connectionBDD.query(sql,
            function (err, rows) {
                if (err) throw err;
                idArticle = rows[1][0].id;

                sql2 = "INSERT INTO art_mat (fk_id_art, fk_id_mat) VALUES "; //ajoute les liens entre articles et matières
                for (let mat of request.body.matiere) {
                    sql2 += `( ${idArticle} , ${mat} ),`;
                }
                sql2 = sql2.slice(0, sql2.length - 1);//supprime la virgule en trop
                sql2 += "; ";

                sql2 += `INSERT INTO image (nom, description, id_article) VALUES `;  //ajoute les nouvelles images
                for (let img of request.body.imagesBDD) {
                    sql2 += `("${img.nomImg}", "${img.descriptionImg}", ${idArticle}),`;
                }
                sql2 = sql2.slice(0, sql2.length - 1); //supprime la virgule en trop
                sql2 += `; ` ;

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


    /* Modifie un article */
    app.post("/modif/:id", function (request, response) {
        let sql = 
            `UPDATE article SET titre = '${request.body.titre}', texte = '${request.body.texte}', prix = ${request.body.prix}, dateCreation = '${request.body.dateCreation}', porteClef = ${request.body.porteClef}, dispo = ${request.body.dispo}, id_categorie = ${request.body.categorie} WHERE id = ${request.params.id};
            DELETE FROM art_mat WHERE fk_id_art = ${request.params.id};
            INSERT INTO art_mat (fk_id_art, fk_id_mat) VALUES 
            `;
        for (let mat of request.body.matiere) {
            sql += `( ${request.params.id} , ${mat} ),`;
        }
        sql = sql.slice(0, sql.length - 1);//supprime la virgule en trop
        sql += ";";

        //ajoute les nouvelles images si présentes
        if (request.body.imagesBDD.length > 0) {
            sql += `INSERT INTO image (nom, description, id_article) VALUES `;  //ajoute les nouvelles images
            for (let img of request.body.imagesBDD) {
                sql += `("${img.nomImg}", "${img.descriptionImg}", ${request.params.id}),`;
            }
            sql = sql.slice(0, sql.length - 1); //supprime la virgule en trop
            sql += `; ` ;
        }
        //supprime les images selectionnées
        if (request.body.imagesSuppr.length > 0) {
            deleteImg(request.body.imagesSuppr);

            sql += `DELETE FROM image WHERE `;
            for(let img of request.body.imagesSuppr){
                sql += `nom = "${img}" OR `;
            }
            sql = sql.slice(0, sql.length - 3); //supprime le OR en trop
            sql += `; ` ;
        }

        connectionBDD.query(sql, function (err, rows) {
            if (err) throw err;
            response.json('Modification réussi');
        })
    })


    /* Supprime un article */
    app.get("/suppr/:id", function (request, response) {
        let sql = 
            'SELECT GROUP_CONCAT(DISTINCT image.nom)AS img FROM image WHERE id_article = ' + request.params.id + ';' + //récupère les nom des images pour les supprimer du dossier d'images
            'DELETE FROM image WHERE id_article = ' + request.params.id + ';' +
            'DELETE FROM article WHERE id = ' + request.params.id + ';' +
            'DELETE FROM art_mat WHERE fk_id_art = ' + request.params.id + ';'
        connectionBDD.query(sql, function (err, rows) {
                if (err) throw err;
                deleteImg(rows[0][0].img.split(",")); //formate le résultat de la requete sous la forme d'un tableau de nom d'images
                response.json('Suppresion réussi');
            });
    })

    async function deleteImg(images) {
        try {
            for (let img of images) {
                await fs.remove(dossier + "/" + img);
            }
        } catch (err) {
            console.error(err)
        }
    }

};

