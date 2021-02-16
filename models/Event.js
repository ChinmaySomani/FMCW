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
        date : {
            type: Sequelize.DATE
        },
        price : {
            type: Sequelize.BIGINT
        },
        club: {
            type: Sequelize.TEXT
        }
    }, {
        timestamps : false
    });
    
    return Event;
 
}