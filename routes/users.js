var express = require('express');
var router = express.Router();

var User = require('../models/User');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', (req, res) => {
  User.create(req.body, (err, user) => {
    console.log(err, user);
    res.json(user);
  })
});

router.post('/login', (req, res, next) => {
  var { email, password } = req.body;
  if(!email || !password) {
    return res.redirect('/');
  }
  User.findOne({ email }, (err, user) => {
    if(err) return next(err);
    if(!user) return res.redirect('/');
    if(!user.validatePassword(password)) return res.redirect('/')
    console.log('userr logged');
    // log a user in
    req.session.userId = user.id;
    res.redirect('/users')
  })
})

module.exports = router;
