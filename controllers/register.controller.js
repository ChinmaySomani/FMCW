var models = require('../models');
var exports = module.exports = {}


exports.login = function(req, res){
    res.render('login.ejs');
}

exports.logout = function(req, res) {
 
    req.session.destroy(function(err) {
 
        res.redirect('/');
 
    });
 
}

exports.signup = function(req, res){
    res.render('signup.ejs');
}

exports.postsign = function(req, res){
    models.user.create(req.body).then(result => {
        console.log(result);
        res.redirect('/register');
    }).catch(error => {
        console.log(error);
    });
}

exports.register = function(req, res){
    models.user.update(req.body, {
        where : {
            id : req.user.id
        }
    }).then(result => {
        res.send(result);
    }).catch(error => {
        console.log(error);
    });
}