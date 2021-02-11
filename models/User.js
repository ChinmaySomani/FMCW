module.exports = function(sequelize, Sequelize) {
 
    var User = sequelize.define('user', {
 
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
 
        username: {
            type: Sequelize.TEXT
        },
 
        type : {
            type: Sequelize.TEXT
        },
 
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
 
        last_login: {
            type: Sequelize.DATE
        },
 
        status: {
            type: Sequelize.ENUM('active', 'inactive'),
            defaultValue: 'active'
        },
        name: {
            type: Sequelize.TEXT
        },
        institute: {
            type: Sequelize.TEXT,
        },
        year: {
            type: Sequelize.INTEGER
        },
        mobile : {
            type: Sequelize.BIGINT
        },
        insta: {
            type: Sequelize.TEXT,
        },
        email: {
            type: Sequelize.TEXT,
            // unique: true,
            validate: {
              isEmail: {
                msg: "Must be a valid email address",
              }
            }      
        }
    });
 
    return User;
 
}