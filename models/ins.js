module.exports = function(sequelize, Sequelize) {
 
    var ins = sequelize.define('ins', {
 
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
        ref_code: {
            type: Sequelize.TEXT,
        },
        norefcode: {
            type: Sequelize.TEXT,
            defaultValue: 0,
        }
    });
 
    return ins;
 
}
