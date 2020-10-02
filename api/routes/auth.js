const { Router } = require('express')
const router = Router();
const jsonwebtoken = require('jsonwebtoken');
const jwt = require('express-jwt');
const LdapAuth = require('ldapauth-fork');
require('dotenv').config();
var createError = require('http-errors');
const fs = require('fs');

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

  try {  
    // Ldap settings
    var user = await new Promise((resolve, reject) => {

      var tlsOptions = {
        ca: [fs.readFileSync('./ldaps.crt', 'utf8')],
        checkServerIdentity: () => { return null; },
        rejectUnauthorized: false
      };

      const auth = new LdapAuth({
        url: process.env.LDAP_URL,
        bindDN: process.env.LDAP_BIND_DN,
        bindCredentials: process.env.LDAP_BIND_CREDENTIALS,
        searchBase: process.env.LDAP_SEARCH_BASE,
        searchFilter: process.env.LDAP_SEARCH_FILTER,
        reconnect: false,
        connectTimeout: 10 * 1000,
        tlsOptions
      });
      auth.on('error', (err) => {  
        auth.close();
        if(err.toString().includes('ECONNRESET')){
          console.warn('LDAP connection disconnected, reconnecting now');
        } else {
          console.error('LDAP: ', err);      
        }
        reject(createError(500, 'INTERNAL'));
      });    

      auth.authenticate(username, password, (err, user) => {
        auth.close();
        if(err){
          console.log(err);
          reject(createError(401, 'USER_NOT_FOUND'));
          return;
        }
        resolve(user);
      });
    });   
  } catch(err){
    res.status(err.status ? err.status : 500).send(err.message);
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