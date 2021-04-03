var router = require('express').Router();
var index = require('../controllers/index.controller.js');
const isLoggedIn = require('../middleware/auth.js');

router.get('/', function(req, res){
    res.send("Landing Page!!");
});

router.get('/admin', function(req, res){
    res.render('admin.ejs');
});

router.get('/admin/alluser', index.alluser);

// router.get('/verti', index.verti);

module.exports = router;