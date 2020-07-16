const { Router } = require('express')
const router = Router();
require('dotenv').config();
const knex = require('knex')({
  client: 'mysql',
  connection: {
      host : process.env.DB_HOST,
      user : process.env.DB_USER,
      password : process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
  },
  pool: { min: 0, max: 10 }    
});

router.get('/contract', async (req, res, next) => {
  var users = await knex.select('*').from('user');
  res.json(users);
});

router.post('/contract', async (req, res, next) => {  
  var user = req.body.user;  
  await knex('user').insert(user)
  res.end();
});

router.delete('/contract/:id', async (req, res, next) => {  
  var id = req.params.id;  
  await knex('user').where({ id: id }).del();
  res.end();
});

module.exports = router;