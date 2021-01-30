module.exports = function(sequelize, Sequelize) {
 
    var Participant = sequelize.define('participant', {
 
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
 
        name: {
            type: Sequelize.TEXT
        },
 
        gender : {
            type: Sequelize.TEXT
        },
        mobile : {
            type: Sequelize.BIGINT
        },
 
        institute: {
            type: Sequelize.TEXT,
            allowNull: false
        },
 
        years_of_study: {
            type: Sequelize.INTEGER
        },
 
        address: {
            type: Sequelize.TEXT
        },
        userid: {
            type: Sequelize.INTEGER,
            references: {
              model: 'users', // Can be both a string representing the table name or a Sequelize model
              key: 'id'
            }
          }
    }, {
        timestamps : false
    });
 
    

    return Participant;
 
}