const mongoose = require("mongoose");
const articleRouter = require("express").Router();
// const User = mongoose.model("User");
const User = require("../../models/User");
const Article = require("../../models/Article");

const auth = require("../auth");

articleRouter.route("/").get(function(req, res, next) {
  Article.find({})
    .limit(10)
    .sort({ createdAt: "desc" })
    .exec(function(err, payload) {
      if (err) {
        next(err);
      } else {
        res.send(payload);
      }
    });
});

articleRouter.route("/").post(auth.required, function(req, res, next) {
  User.findById(req.payload.sub)
    .then(function(user) {
      if (!user) {
        return res.sendStatus(401);
      }

      var article = new Article(req.body.article);

      article.author = user;

      return article.save().then(function() {
        return res.json({ article: article.toJSON(user) });
      });
    })
    .catch(next);
});

articleRouter.route("/:slug").get(auth.required, function(req, res, next) {
  const slug = req.params.slug;
  Article.findOne({ slug: slug })
    .populate("author")
    .then(function(article) {
      if (!article) {
        return res.sendStatus(404);
      }
      res.send({ article: article.toJSONFor() });
    })
    .catch(next);
});

module.exports = articleRouter;
