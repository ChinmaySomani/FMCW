var models = require('../models');
var exports = module.exports = {}

exports.allevent = function(req, res){
    models.event.findAll()
    .then(result => {
        res.render('event.ejs', {result : result});
        // res.send(result[0]);
    }).catch(error => {
        console.log(error);
    });
}