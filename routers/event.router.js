var router = require('express').Router();
var index = require('../controllers/event.controller.js');
var passport = require('passport');
const isLoggedIn = require('../middleware/auth.js');

router.get('/event', isLoggedIn, index.allevent);

router.get('/event/participate/:id', index.participate);

router.get('/event/okay', index.okay);
module.exports = router;