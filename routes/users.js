var express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const { User } = require('../db/models');
const {csrfProtection, asyncHandler } = require('./utils');
const { loginUser, logoutUser } = require('../auth');

var router = express.Router();

/* GET users listing. */
router.get('/register', csrfProtection, (req, res) => {

  const user = User.build();

  res.render('user-register', {
    title: 'Register',
    user,
    csrfToken: req.csrfToken(),
  });

});

module.exports = router;
