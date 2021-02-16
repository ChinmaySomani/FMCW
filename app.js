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

//Google Auth
const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = '214944693451-44fee8em9ahdseehh4m0imeinqsn90o8.apps.googleusercontent.com'
const client = new OAuth2Client(CLIENT_ID);

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
    saveUninitialized: true,
    secure : true
})); // session secret
// app.use(passport.initialize());
// app.use(passport.session()); // persistent login sessions

// require('./services/passport.js')(passport, models.user);

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
      user.password = payload.password;
      models.user.findOne({where : {
        email : payload.email
      }}).then((foundItem) => {
        if(!foundItem){
          models.user.create(user)
          .then(function(result){
            req.user = result;
            console.log('Added new user');
          }).catch(function(error){
            console.log(error);
          });
        }
      })
    }
    verify()
    .then(()=>{
        req.session.token = token;
        res.send('success')
    })
    .catch(console.error);

});

app.get('/google/logout', function(req, res){
  req.session.destroy(function(err) {
 
    res.redirect('/');

});
})


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


app.listen(process.env.PORT || 3000, process.env.IP, function(err, result){
    console.log('Server is running at port!');
});