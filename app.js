var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const {Sequelize} = require("sequelize");
var methodOverride = require('method-override');
var passport = require('passport')
var session = require('express-session')


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));


var models = require("./models");



// For Passport
app.use(session({
    secret: 'FMC is love, FMC is life',
    resave: true,
    saveUninitialized: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

require('./services/passport.js')(passport, models.user);

const rout = require('./routers/index.router.js');
const eventrout = require('./routers/event.router.js');
const registerrout = require('./routers/register.router.js');

app.use('/', rout);
app.use('/', eventrout);
app.use('/', registerrout);


models.sequelize.sync().then(function() {
 
    console.log('Nice! Database looks fine')
 
 
}).catch(function(err) {
 
    console.log(err, "Something went wrong with the Database Update!")
 
});

app.listen(3000, function(err, result){
    console.log('Server is running at port 3000!');
});