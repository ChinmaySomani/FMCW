var router = require('express').Router();
var index = require('../controllers/index.controller.js');
var passport = require('passport');
const isLoggedIn = require('../middleware/auth.js');


router.get('/', index.home);

router.get('/admin', function(req, res){
    res.render('admin.ejs');
});

router.get('/admin/alluser', index.alluser);

router.get('/admin/addevent', function(req, res){
    res.render('addevent.ejs');
});

router.post('/admin/addevent', index.addevent);



module.exports = router;