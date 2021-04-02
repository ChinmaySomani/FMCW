module.exports = function(sequelize, Sequelize) {
 
    var User = sequelize.define('user', {
 
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        email: {
            type: Sequelize.TEXT,
            // unique: true,
            validate: {
              isEmail: {
                msg: "Must be a valid email address",
              }
            }      
        },
        name: {
            type: Sequelize.TEXT
        },
        type: {
            type: Sequelize.TEXT,
        }
    });
 
    return User;
 
}