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
// exports.verti = async function(req, res){
//     await models.user.destroy({where: {email: 'angrycder@gmail.com'}})
//     await models.pa.destroy({where: {email: 'angrycder@gmail.com'}})
//     res.send("success");
//     // await models.user.destroy({where: {email: 'ksnabielmartin.mec18@itbhu.ac.in'}})
// }