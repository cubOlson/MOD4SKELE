const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const { User } = require('../db/models');
const { csrfProtection, asyncHandler } = require('./utils');
const { loginUser, logoutUser } = require('../auth');

const router = express.Router();

const userValidators = [
  check('username')
    .exists({ checkFalsey: true })
    .withMessage( 'Please provide a username.' )
    .isLength({ max: 100 })
    .withMessage( 'Username must be 100 characters or less' ),
  check('email')
    .exists({ checkFalsey: true })
    .withMessage('Please provide an email.')
    .isLength({ max: 255 })
    .withMessage('Email must be 255 characters or less.')
    .isEmail()
    .withMessage('Email address is not valid.')
    .custom(value => {
      return User.findOne({ where: { email: value }})
        .then(user => {
          if (user) {
            return Promise.reject('The provided email address is already in use.')
          }
        });
    }),
  check('password')
    .exists({ checkFalsey: true })
    .withMessage('Please provide a password.')
    .isLength({ max: 100 })
    .withMessage('Password must be 100 characters or less.'),
  check('confirmPassword')
    .exists({ checkFalsey: true })
    .withMessage('Please confirm your password.')
    .isLength({ max: 100 })
    .withMessage( 'Confirmed password must be 100 characters or less.')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match.');
      }
      return true
    }),
];

const loginValidator = [
  check('email')
    .exists({ checkFalsey: true })
    .withMessage('Please provide an email address.'),
  check('password')
    .exists({ checkFalsey: true })
    .withMessage('Please provide a password.')
];

/* GET users listing. */
router.get('/register', csrfProtection, (req, res) => {

  const user = User.build();

  res.render('user-register', {
    title: 'Register',
    user,
    csrfToken: req.csrfToken(),
  });
});

router.post('/register', 
csrfProtection, 
userValidators,
asyncHandler(async(req, res) => {

  const { username, email, password } = req.body;

  const user = User.build({ username, email });

  const validatorErrors = validationResult(req);

  if (validatorErrors.isEmpty()) {

    const hashedPassword = await bcrypt.hash(password, 10);
    user.hashedPassword = hashedPassword;
    await user.save();
    loginUser(req, res, user);
    res.redirect('/')

  } else {

    const errors = validatorErrors.array().map(error => error.msg);
    res.render('user-register', {
      title: 'Register',
      user,
      errors,
      csrfToken: req.csrfToken(),
    });
  }
}));

router.get('/login', csrfProtection, (req, res) => {
  res.render('user-login', {
    title: 'Login',
    csrfToken: req.csrfToken(),
  });
});

router.post('/login', 
csrfProtection, 
loginValidator, 
asyncHandler(async(req, res) => {

  const { email, password } = req.body;

  let errors = [];
  const validatorErrors = validationResult(req);

  if (validatorErrors.isEmpty()) {
    const user = await User.findOne({ where: { email } });

    if (user !== null) {

      const passwordMatch = await bcrypt.compare(password, user.hashedPassword.toString());

      if (passwordMatch) {
        loginUser(req, res, user);
        return res.redirect('/');
      }
    }

    errors.push('Login failed for the provided credentials.')
  } else {
    errors = validatorErrors.array().map(error => error.msg);
  }

  res.render('user-login', {
    title: 'Login',
    email,
    errors,
    csrfToken: req.csrfToken(),
  });
}));

router.post('/logout', (req, res) => {
  logoutUser(req, res);
  res.redirect('/');
});



module.exports = router;
