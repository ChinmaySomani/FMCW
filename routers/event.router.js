var router = require('express').Router();
var index = require('../controllers/event.controller.js');
var passport = require('passport');
const isLoggedIn = require('../middleware/auth.js');

router.get('/event', isLoggedIn, index.allevent);

router.get('/event/register', function(req, res){
    res.send('Payment Page');
});
module.exports = router;