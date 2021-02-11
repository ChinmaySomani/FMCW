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

exports.participate = function(req, res){
    models.eventpart.create({userId : req.user.id, eventId : req.params.id})
    .then(result => {
        res.send('Registered in the event');
    }).catch(error => {
        console.log(error);
    });
}

exports.okay = function(req, res){
    userId = req.user.id;
    models.sequelize.query("SELECT * FROM events WHERE (events.id NOT IN (SELECT eventId FROM eventparts WHERE eventparts.userId="+userId+")) ",{ type: models.Sequelize.QueryTypes.SELECT })
    .then(result => {
        res.render('event.ejs', {result : result});
    }).catch(error => {
        console.log(error);
    });
}
