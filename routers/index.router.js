var router = require('express').Router();
var index = require('../controllers/index.controller.js');
var passport = require('passport');
const isLoggedIn = require('../middleware/auth.js');

router.get('/', index.home);

router.get('/admin', isLoggedIn, function(req, res){
    res.render('admin.ejs');
});

router.get('/admin/alluser', isLoggedIn, index.alluser);

router.get('/admin/addevent', isLoggedIn, function(req, res){
    res.render('addevent.ejs');
});

router.post('/admin/addevent', isLoggedIn, index.addevent);

module.exports = router;