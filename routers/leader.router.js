var router = require('express').Router();
var index = require('../controllers/leader.controller.js');

router.get('/leaderboard', index.leader);

module.exports = router;