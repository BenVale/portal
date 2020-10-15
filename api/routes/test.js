const { Router } = require('express')
const router = Router();
require('dotenv').config();


router.get('/licenses/:email', async (req, res, next) => {
  await new Promise(resolve => setTimeout(resolve, 100)); 
  res.send([{id: 'licenseTest'}]);
});

router.get('/installations/:customer', async (req, res, next) => {
  await new Promise(resolve => setTimeout(resolve, 100)); 
  res.send([{id: 'installationTest'}]);
});

router.get('/customers/:email', async (req, res, next) => {
  await new Promise(resolve => setTimeout(resolve, 100)); 
  res.send([{id: 'customerTest'}]);
});

router.get('/telemetry/:installation', async (req, res, next) => {
  await new Promise(resolve => setTimeout(resolve, 100)); 
  res.send([{id: 'telemetryTest'}]);
});

router.get('/users/:email', async (req, res, next) => {
  await new Promise(resolve => setTimeout(resolve, 100)); 
  res.send([{id: 'userTest'}]);
});

router.get('/support/:email', async (req, res, next) => {
  await new Promise(resolve => setTimeout(resolve, 100)); 
  res.send([{id: 'supportTest'}]);
});

router.get('/tickets/:email', async (req, res, next) => {
  await new Promise(resolve => setTimeout(resolve, 100)); 
  res.send([{id: 'ticketTest'}]);
});


module.exports = router;