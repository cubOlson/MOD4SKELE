const express = require('express');
const { APISecret } = require('../config');
const router = express.Router();
const { UserLocation } = require('../db/models');
const { asyncHandler } = require('./utils');

/* GET home page. */
router.get('/', asyncHandler(async(req, res) => {

  let userLocations = null;

  if (req.session.auth){
    const {userId } = req.session.auth;
    userLocations = await UserLocation.findAll({
      where: {
        userId
      }
    });
  }
  console.log('AFTER QUERY', userLocations)
  res.render('index', { title: 'The Weather App Home', APISecret, userLocations });
}));

module.exports = router;
