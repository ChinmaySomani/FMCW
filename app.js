var express = require("express");
var app = express();
var cors = require("cors");
const { Sequelize } = require("sequelize");
var methodOverride = require("method-override");
var session = require("express-session");
var nodemailer = require("nodemailer");
var cookieparser = require("cookie-parser");
var axios = require("axios");
var randomstring = require("randomstring");
const SessionStore = require('express-session-sequelize')(session.Store);
var https = require('https');
const checksum_lib = require('./Paytm/checksum/checksum.js');

app.set('trust proxy', 1);
var sess;
//Google Auth
const { OAuth2Client } = require("google-auth-library");
// const CLIENT_ID = "214944693451-44fee8em9ahdseehh4m0imeinqsn90o8.apps.googleusercontent.com";
// const CLIENT_ID = '214944693451-2sue5kgd5p6b0sufrbfvabkesvc11esc.apps.googleusercontent.com';
// const CLIENT_ID = "214944693451-8h0s6lq4pd7ls02n71pulda5sabjqq5c.apps.googleusercontent.com";
const CLIENT_ID = "214944693451-iqen2gebk39m2v4c7ip7t2nf8c6r6b3a.apps.googleusercontent.com";
  // "214944693451-6q967rohsbakus5g1k02k2hk3nv7inat.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);


var models = require("./models");

// app.use(cors({
//   origin:[
//     "https://localhost:4200",
//     "http://localhost:4200",
//     "https://fmcweekend.in",
//     "http://fmcweekend.in"
//   ],//frontend server localhost:8080
//   methods:['GET','POST','PUT','DELETE'],
//   credentials: true // enable set cookie
//  }));
//Express-session
// app.use(cookieparser("FMC is love, FMC is life"));
// app.use(
//   session({
//     secret: "FMC is love, FMC is life",
//     proxy: true,
//     httpOnly : false,
//     resave: true,
//     secure: true,
//     saveUninitialized: true,
//     store: models.sequelizeSessionStore,
//     cookie : {
//       secure: true,
//       httpOnly: false,
//     }
//     // store: MongoStore.create({
//     //   mongoUrl:
//     //     "mongodb://gmail_auth:gmail_auth@fmc-shard-00-00.fsipp.mongodb.net:27017,fmc-shard-00-01.fsipp.mongodb.net:27017,fmc-shard-00-02.fsipp.mongodb.net:27017/fmcweek?ssl=true&replicaSet=fmc-shard-0&authSource=admin&retryWrites=true&w=majority",
//     // }),
//   })
// );


// app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(methodOverride('_method'));
app.use(express.static('.'));
app.set('view engine', 'ejs');

app.use(function (req, res, next) {
  const allowedOrigins = [
    "https://localhost:4200",
    "http://localhost:4200",
    "https://fmcweekend.in",
    "http://fmcweekend.in"
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  // Website you wish to allow to connect
  // res.setHeader('Access-Control-Allow-Origin', 'https://fmcmerch.herokuapp.com');
  // res.setHeader('Access-Control-Allow-Origin', 'https://localhost:4200');

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});


//Google Login
app.post('/google/login',function(req, res){
  let token = req.body.token;
  var user = {};
  async function verify() {
      const ticket = await client.verifyIdToken({
          idToken: token,
          audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
      });
      const payload = ticket.getPayload();
      user.email = payload.email;
      user.name = payload.name;
      await models.user.findOne({where : {
        email : payload.email
      }}).then(async function(foundItem){
        if(!foundItem){
          await models.user.create(user)
          .then(function(result){
            // req.user = result;
            console.log('Added new user');
          }).catch(function(error){
            console.log(error);
          });
        }
        else user.type = foundItem.type;
      })
    }
    verify()
    .then(async ()=>{
        // req.session.token = token;
        var emcheck = user.email.substr(user.email.length - 11);

        if(user.type === "IN")res.json({"message": "insti"});
        else if(emcheck === "itbhu.ac.in" && user.type != "IN"){
              var inst = {};
              inst.email = user.email;
              inst.name = user.name;
              inst.ref_code = "IN" + randomstring.generate({
                length: 8,
                charset: "alphanumeric",
                readable: true,
                capitalization: "uppercase",
              });
              models.ins.create(inst).then((result)=>{
                console.log("Added Institute");
                models.user.update({"type": "IN"}, {where: {email: user.email}})
                .then((result)=>{
                  console.log("type user updated insti");
                  res.json({"message": "insti"});
                }).catch((error)=>{
                  console.log(error);
                });
              }).catch((error)=>{
                console.log(error);
              });
        }
        else if(user.type === "CA")res.json({"message": "ca"});
        else if(user.type === "PA")res.json({"message": "pa"});
        else res.json({"message": "nodetail"});
        // await models.user.findOne({where: {email: user.email}})
        // .then((found)=>{
        //   if(emcheck === "itbhu.ac.in" && found.type === "IN")res.json({"message": "insti"});
        //   else if(emcheck === "itbhu.ac.in" && !found.type){
        //     models.in.create()
        //   }
        //   else if(found.type === "CA")res.json({"message": "ca"});
        //   else if(found.type === "PA")res.json({"message": "pa"});
        //   else res.json({"message": "nodetail"});
        // }).catch((error)=>{
        //   console.log(error);
        // });
        // res.json({ message: "success" });
    })
    .catch(console.error);
});

app.get('/google/logout', function(req, res){
  // req.session.destroy(function(err) {
    res.json({"message": "logged out"});
    // res.redirect('/');
// });
});

app.get('/alluser', function(req, res){
  models.user.findAll()
  .then((result)=>{
    res.send(result);
  });
});
app.get('/delete', function(req, res){
  models.user.destroy({truncate: true})
  .then((result)=>{
    res.send("success");
  });
});
app.get('/delete/ca', function(req, res){
  models.ca.destroy({truncate: true})
  .then((result)=>{
    res.send("success");
  });
});
app.get('/delete/pa', function(req, res){
  models.pa.destroy({truncate: true})
  .then((result)=>{
    res.send("success");
  });
});

app.get('/allca', function(req, res){
  models.ca.findAll()
  .then((result)=>{
    res.send(result);
  });
});

app.get('/allpa', function(req, res){
  models.pa.findAll()
  .then((result)=>{
    res.send(result);
  });
});

app.get('/allin', function(req, res){
  models.ins.findAll()
  .then((result)=>{
    res.send(result);
  });
});




//Routers
const rout = require('./routers/index.router.js');
const eventrout = require('./routers/event.router.js');
const registerrout = require('./routers/register.router.js');
const leaderrout = require('./routers/leader.router.js');

app.use('/', rout);
app.use('/', eventrout);
app.use('/', registerrout);
app.use('/', leaderrout);

models.sequelize
        .authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .catch((err) => {
            console.log('Unable to connect to the database:', err);
        });

models.sequelize.sync().then(function() {
 
    console.log('Nice! Database looks fine')
 
 
}).catch(function(err) {
 
    console.log(err, "Something went wrong with the Database Update!")
 
});


app.listen(process.env.PORT || 8080, process.env.IP, function (err, result) {
  console.log("Server is running at port!");
});
