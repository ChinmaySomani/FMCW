module.exports = function(sequelize, Sequelize) {

    var Eventpart = sequelize.define('eventpart', {}, {
        timestamps : false
    });

    return Eventpart;
}
