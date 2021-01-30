var models = require('../models');
var exports = module.exports = {}


exports.home = function(req, res){
    res.render('home.ejs');
}

exports.alluser = function(req, res){
    models.participant.findAll()
    .then(result => {
        res.send(result);
    }).catch(error => {
        console.log(error);
    });
}

exports.addevent = function(req, res){
    models.event.create(req.body).then(result => {
        res.redirect('/event');
    }).catch(error => {
        console.log(error);
    })
}