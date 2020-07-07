const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('express-jwt');
const jsonwebtoken = require('jsonwebtoken');
var LdapAuth = require('ldapauth-fork');
require('dotenv').config()

// Ldap settings
var auth = new LdapAuth({
  url: process.env.LDAP_URL,
  bindDN: process.env.LDAP_BIND_DN,
  bindCredentials: process.env.LDAP_BIND_CREDENTIALS,
  searchBase: process.env.LDAP_SEARCH_BASE,
  searchFilter: process.env.LDAP_SEARCH_FILTER,
  reconnect: true,
});
auth.on('error', function (err) {
  console.error('LdapAuth: ', err);
});

// Create app
const app = express();

// Install middleware
app.use(cookieParser());
app.use(bodyParser.json());

app.use(
  jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256']
  }).unless({
    path: '/api/auth/login'
  })
);

app.post('/login', async (req, res, next) => {
  var { username, password } = req.body;

 
  // Authenticate using LDAP
  var user = null;
  try {
    user = await new Promise((resolve, reject) => auth.authenticate(username, password, (err, user) => err != null ? reject(err) : resolve(user)));
  } catch(err){
    res.status(401).send(err);
    return;
  }

  // Create access token
  const accessToken = jsonwebtoken.sign(
    { ...user, scope: ['normal'] },
    process.env.JWT_SECRET,
    { algorithm: 'HS256'}
  )

  res.json({ token: { accessToken } });
})

app.get('/user', (req, res, next) => {
  res.json({ user: req.user })
})

app.post('/logout', (req, res, next) => {
  req.user = null;
  res.json({ status: 'OK' })
})

// Error handler
app.use((err, req, res, next) => {
  console.error(err) // eslint-disable-line no-console
  res.status(401).send(err + '')
})

module.exports = {
  path: '/api/auth',
  handler: app
}