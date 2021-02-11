var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var cors = require('cors');
var bodyParser = require('body-parser');
const {Sequelize} = require("sequelize");
var methodOverride = require('method-override');
var passport = require('passport')
var session = require('express-session')
const Razorpay = require('razorpay')

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(cors());
app.use(express.static('.'));

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

var instance = new Razorpay({
  key_id: 'rzp_test_BZmqKg2c3vGbFd',
  key_secret: 'tHVihjxMF87Ciquz0O1MOadP'
})

app.post('/create-checkout-session', async (req, res) => {
var options = {
  amount: 50000,  // amount in the smallest currency unit
  currency: "INR",
  receipt: "order_rcptid_11"
};
 var a = await instance.orders.create(options);
 res.json(a)
});


//Routers
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
    console.log('Server is running at port!');
});