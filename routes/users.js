var express = require('express');
var router = express.Router();
var auth = require('../middlewares/auth');

var User = require('../models/User');

/* GET users listing. */
router.get('/', auth.verifyUserLogin, function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', (req, res) => {
  User.create(req.body, (err, user) => {
    console.log(err, user);
    res.json(user);
  })
});


router.get('/login',  (req, res) => {
  var warn = req.flash('warn')[0];
  var error = req.flash('error')[0];

  console.log(warn)
  res.render('loginForm', { warn, error });
})

router.post('/login', (req, res, next) => {
  var { email, password } = req.body;
  if(!email || !password) {
    req.flash('warn', 'Email/password required');
    return res.redirect('/users/login');
  }
  User.findOne({ email }, (err, user) => {
    if(err) return next(err);
    if(!user) { 
      req.flash('error', "Email not registered");
      return res.redirect('/users/login');
    }
    if(!user.validatePassword(password)) return res.redirect('/users/login')
    // log a user in
    req.session.userId = user.id;
    res.redirect('/articles')
  })
})

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.clearCookie('connect-sid');
  res.redirect('/users/login');
  
})

module.exports = router;
