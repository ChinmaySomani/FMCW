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
//     await models.pa.update({norefcode: 0}, {where : {email: 'chinmaycooldud@gmail.com'}});
//     await models.pa.update({norefcode: 0}, {where : {email: 'arhanjain97@gmail.com'}});
//     await models.pa.update({norefcode: 0}, {where : {email: 'arhan.jain126@gmail.com'}});
//     await models.pa.update({norefcode: 0}, {where : {email: 'aryashukla95@gmail.com'}});
//     await models.pa.update({norefcode: 0}, {where : {email: 'vishakhasedwal99@gmail.com'}});
//     res.send('success');
// };