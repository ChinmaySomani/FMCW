module.exports = function(sequelize, Sequelize) {
 
    var ca = sequelize.define('ca', {
 
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
        organization: {
            type: Sequelize.TEXT,
        },
        year: {
            type: Sequelize.INTEGER
        },
        number : {
            type: Sequelize.BIGINT
        },
        ref_code: {
            type: Sequelize.TEXT,
        },
        norefcode: {
            type: Sequelize.TEXT,
            defaultValue: 0,
        }
    });
 
    return ca;
 
}
