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
        type : {
            type: Sequelize.TEXT
        },
 
        password: {
            type: Sequelize.STRING,
            allowNull: false
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
        }
    });
 
    return User;
 
}