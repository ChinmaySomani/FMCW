var models = require('../models');
var exports = module.exports = {}

exports.alluser = function(req, res){
    models.user.findAll()
    .then(result => {
        res.send(result);
    }).catch(error => {
        console.log(error);
    });
};

// exports.getuser =