module.exports = function(sequelize, Sequelize) {
 
    var Event = sequelize.define('event', {
 
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
 
        details: {
            type: Sequelize.TEXT
        },
 
        link : {
            type: Sequelize.TEXT
        },
        price : {
            type: Sequelize.BIGINT
        },
 
        workshop_name: {
            type: Sequelize.TEXT,
        },
 
        workshop_details: {
            type: Sequelize.TEXT
        },
 
        club: {
            type: Sequelize.TEXT
        }
    }, {
        timestamps : false
    });
    
    return Event;
 
}