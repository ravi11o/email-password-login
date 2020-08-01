var express = require('express');
var router = express.Router();

var auth = require("../middlewares/auth");

var Article = require('../models/Article');

router.get('/new', auth.verifyUserLogin, (req, res) => {
  res.render('articleForm');
})

router.get('/', (req, res, next) => {
  // Article.find({}, (err, articles) => {
  //   res.render('listArticles', { articles });
  // })

  Article.find().populate('author', 'name email').exec((err, articles) => {
    console.log(articles);
    res.render('listArticles', { articles });
  })
})

router.post('/', (req, res, next) => {
  req.body.author = req.user._id;
  Article.create(req.body, (err, article) => {
    if(err) return next(err);
    console.log(err, article);
    res.redirect('/articles');
  })
});

router.get('/:articleId/delete', (req, res) => {
  
})

module.exports = router;