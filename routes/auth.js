const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = express.Router();

router.get('/login', (req, res) => res.render('login',{ title: 'Login', user: req.user }));
router.get('/register', (req, res) => res.render('register',{ title: 'Register', user: req.user }));

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const passwordHash = bcrypt.hashSync(password, salt);
  await User.create({ email, passwordHash, salt: bcrypt.genSaltSync(10) });
  res.redirect('/login');
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.redirect('/login');
  if (bcrypt.compareSync(password, user.passwordHash)) {
    req.session.userId = user._id;
    res.redirect('/vault');
  } else res.redirect('/login');
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/login'));
});

module.exports = router;