const { OAuth2Client } = require("google-auth-library");
// const CLIENT_ID = "214944693451-44fee8em9ahdseehh4m0imeinqsn90o8.apps.googleusercontent.com";

// const CLIENT_ID = "214944693451-8h0s6lq4pd7ls02n71pulda5sabjqq5c.apps.googleusercontent.com";
const CLIENT_ID = "214944693451-iqen2gebk39m2v4c7ip7t2nf8c6r6b3a.apps.googleusercontent.com";
  // "214944693451-6q967rohsbakus5g1k02k2hk3nv7inat.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);

var queryString = require('query-string');
var axios = require('axios');
var exports = module.exports = {}


exports.getGoogleUserInfo = async function(access_token) {
  const ticket = await client.verifyIdToken({
    idToken: access_token,
    audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
  });
  const payload = ticket.getPayload();
  // console.log(payload); // { id, email, given_name, family_name }
  var email = payload.email;
  return email;
};