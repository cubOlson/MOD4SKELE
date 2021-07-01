const express = require('express');
const router = express.Router();

const { requireAuth } = require('../auth');


/* GET home page. */
router.get('/', requireAuth, function(req, res, next) {
  res.render('index', { title: 'The Weather App Home' });
});

module.exports = router;
