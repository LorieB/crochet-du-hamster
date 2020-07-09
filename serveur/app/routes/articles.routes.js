const { authJwt } = require("../middleware");
const controller = require("../controllers/articles.controller");

const pathPh = require("../config/path.config");

const busboy = require('connect-busboy'); //middleware for form/file upload
const path = require('path');     //used for file path


module.exports = function(app, express) {
    app.use(busboy());
    app.use(express.static(path.join(pathPh.pathPhoto, 'public')));

  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  
  app.get("/articles", controller.getArticles);

  app.get("/articles/:id", controller.getArticleById);

  app.get("/matCat", controller.getMatCat);

  app.post("/ajout", [authJwt.verifyToken, authJwt.isAdmin], controller.ajoutArticle);

  app.post("/uploadImg", [authJwt.verifyToken, authJwt.isAdmin], controller.uploadImg);

  app.post("/modif/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.modifArticle);

  app.get("/suppr/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.supprArticle);

};
