var models = require('../models');
var exports = module.exports = {}

exports.leader = function(req, res){
    models.pa.findAll({
        limit: 5,
        order: [ [ 'norefcode', 'DESC' ]]
      }).then((result)=>{
          res.json(result);
      }).catch((error)=>{
          res.send(error);
      });
};