const { getSong } = require('../controllers/spotySearch');

const router = require('express').Router();

router.get('/random-song/:name',getSong)

module.exports = router; 