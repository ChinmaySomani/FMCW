var models = require('../models');
var exports = module.exports = {}

exports.leader = function(req, res){
    models.pa.findAll({
        limit: 5,
        order: [ [ 'norefcode', 'DESC' ]],
        attributes: ['name', 'ref_code', 'norefcode'],
      }).then((result)=>{
          res.json(result);
      }).catch((error)=>{
          res.send(error);
      });
};

// exports.change = async function(req, res){
//     await models.pa.updare
// }