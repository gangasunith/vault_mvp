const express = require('express');
const VaultItem = require('../models/VaultItem');
const router = express.Router();

function requireAuth(req, res, next) {
  if (!req.session.userId) return res.redirect('/login');
  next();
}

router.get('/', requireAuth, async (req, res) => {
  const items = await VaultItem.find({ userId: req.session.userId });
  res.render('vault',{ title: 'My Vault', items, user: req.user });
});

router.get('/add', requireAuth, (req, res) => res.render('addItem', { title: 'Add Vault Item', user: req.user }));

router.post('/add', requireAuth, async (req, res) => {
  await VaultItem.create({ userId: req.session.userId, ...req.body });
  res.redirect('/vault');
});

router.get('/edit/:id', requireAuth, async (req, res) => {
  const item = await VaultItem.findById(req.params.id);
  res.render('editItem', { title: 'Edit Vault Item', item, user: req.user });
});

router.post('/edit/:id', requireAuth, async (req, res) => {
  await VaultItem.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/vault');
});

router.post('/delete/:id', requireAuth, async (req, res) => {
  await VaultItem.findByIdAndDelete(req.params.id);
  res.redirect('/vault');
});


module.exports = router;
