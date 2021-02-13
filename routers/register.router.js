var router = require('express').Router();
var index = require('../controllers/register.controller.js');
var passport = require('passport');
const isLoggedIn = require('../middleware/auth.js');
var gauth = require('../middleware/goath.js')

router.get('/login', index.login);

router.post('/login',  passport.authenticate('local-signin', {
    successRedirect: '/event',

    failureRedirect: '/login'
}

));

router.get('/logout',index.logout);

router.get('/signup', index.signup);

router.post('/signup', passport.authenticate('local-signup', {    
    failureRedirect: '/signup'
}), (req, res) => {
    res.redirect('/register');
});

router.get('/register', isLoggedIn, function(req, res){
    res.render('register.ejs');
});

router.post('/register', index.register);


module.exports = router;