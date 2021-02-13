var queryString = require('query-string');
var axios = require('axios');
var exports = module.exports = {}



exports.urlfind = function(){
    const stringifiedParams = queryString.stringify({
        client_id: "214944693451-44fee8em9ahdseehh4m0imeinqsn90o8.apps.googleusercontent.com",
        redirect_uri: "https://fmcweek.herokuapp.com/",
        scope: [
          'https://www.googleapis.com/auth/userinfo.email',
          'https://www.googleapis.com/auth/userinfo.profile',
        ].join(' '), // space seperated string
        response_type: 'code',
        access_type: 'offline',
        prompt: 'consent',
      });

      const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`;

      return googleLoginUrl;
}

exports.getAccessTokenFromCode  = async function(code) {
  const { data } = await axios({
    url: `https://oauth2.googleapis.com/token`,
    method: 'post',
    data: {
      client_id:"214944693451-44fee8em9ahdseehh4m0imeinqsn90o8.apps.googleusercontent.com",
      client_secret:"CL6tpnbapbjbpOz0Nd5XE0-C",
      redirect_uri: "https://fmcweek.herokuapp.com/",
      grant_type: 'authorization_code',
      code,
    },
  });
  console.log(data); // { access_token, expires_in, token_type, refresh_token }
  return data.access_token;
};

exports.getGoogleUserInfo = async function(access_token) {
    const { data } = await axios({
      url: 'https://www.googleapis.com/oauth2/v2/userinfo',
      method: 'get',
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    console.log(data); // { id, email, given_name, family_name }
    return data;
  };