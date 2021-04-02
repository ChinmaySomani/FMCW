const {Sequelize} = require("sequelize");
// var session = require("express-session");
// const SessionStore = require('express-session-sequelize')(session.Store);

// const sequelize = new Sequelize("pagledzy", "pagledzy", "uXsyKPsd5pSHCPLxpsIJHb6I5-g_buu-", {
//     host: "queenie.db.elephantsql.com",
//     // port: 3306,
//     dialect: "postgres",
//     dialectModule: require("pg"),
//   });


const sequelize = new Sequelize("fmcweek", "root", "IndicaSativa", {
    host: "postgresql-26069-0.cloudclusters.net",
    port: 26112,
    dialect: "postgres",
    dialectModule: require("pg"),
  });
  
  // const sequelize2 = new Sequelize("ldqdlvsi", "ldqdlvsi", "jNIcXwHV5fqdT4ieHHga7x6tV7uamoFV", {
  //   host: "queenie.db.elephantsql.com",
  //   // port: 3306,
  //   dialect: "postgres",
  //   dialectModule: require("pg"),
  // });
  
  const db = {};
  // db.sequelizeSessionStore = new SessionStore({
    // db: sequelize2,
  // });
  
  var model = require("./User")(sequelize, Sequelize);
  db[model.name] = model;
  var model = require("./ca")(sequelize, Sequelize);
  db[model.name] = model;
  var model = require("./pa")(sequelize, Sequelize);
  db[model.name] = model;
  var model = require("./ins")(sequelize, Sequelize);
  db[model.name] = model;

 
Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});


db.Sequelize = Sequelize;
db.sequelize = sequelize;



module.exports = db;