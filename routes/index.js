const express = require('express');
const { APISecret } = require('../config')
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'The Weather App Home', APISecret });
});

module.exports = router;
