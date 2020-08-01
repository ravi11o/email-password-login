exports.verifyUserLogin = (req, res, next) => {
  if(req.session && req.session.userId) {
    next()
  } else {
    req.flash('warn', 'Unauthenticated');
    res.redirect('/users/login');
  }
}