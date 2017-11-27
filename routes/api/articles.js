const articleRouter = require("express").Router();

articleRouter.route("/").get(function(req, res, next) {
  res.send("OH CRAP I HOPE THIS WORKS?");
});

module.exports = articleRouter;
