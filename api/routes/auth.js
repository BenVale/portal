const { Router } = require('express')
const router = Router();
const jsonwebtoken = require('jsonwebtoken');
const jwt = require('express-jwt');
const LdapAuth = require('ldapauth-fork');
require('dotenv').config();

router.use(
  jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256']
  }).unless({
    path: '/api/auth/login'
  })
);

router.post('/login', async (req, res, next) => {
  var { username, password } = req.body;

  // Ldap settings
  const auth = new LdapAuth({
    url: process.env.LDAP_URL,
    bindDN: process.env.LDAP_BIND_DN,
    bindCredentials: process.env.LDAP_BIND_CREDENTIALS,
    searchBase: process.env.LDAP_SEARCH_BASE,
    searchFilter: process.env.LDAP_SEARCH_FILTER,
    reconnect: false,
  });
  auth.on('error', function (err) {  
    if(err.toString().includes('ECONNRESET')){
      console.warn('LDAP connection disconnected, reconnecting now');
    } else {
      console.error('LDAP: ', err);
    }
  });

  // Authenticate using LDAP
  var user = null;
  try {
    user = await new Promise((resolve, reject) => auth.authenticate(username, password, (err, user) => err != null ? reject(err) : resolve(user)));
    auth.close();
  } catch(err){
    auth.close();
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

router.get('/user', (req, res, next) => {
  res.json({ user: req.user })
})

router.post('/logout', (req, res, next) => {
  req.user = null;
  res.json({ status: 'OK' })
})

module.exports = router;