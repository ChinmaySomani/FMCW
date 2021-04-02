module.exports = function(sequelize, Sequelize) {
 
    var pa = sequelize.define('pa', {
 
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
            type: Sequelize.BIGINT,
            defaultValue: 0,
        },
        redeem: {
            type: Sequelize.TEXT,
        },
        codecheck: {
            type: Sequelize.BIGINT,
        },
        pass: {
            type: Sequelize.TEXT,
        },
        add: {
            type: Sequelize.TEXT,
        },
        paid: {
            type: Sequelize.TEXT,
        },
        amount: {
            type: Sequelize.BIGINT,
        },
        receipt: {
            type: Sequelize.TEXT,
        },
        payment_id: {
            type: Sequelize.TEXT
        },
        payment_request_id: {
            type: Sequelize.TEXT
        }
    });
 
    return pa;
 
}
