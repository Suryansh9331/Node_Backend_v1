// routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');

// GET /api/users - list all users
router.get('/', async (req, res, next) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

//
router.post('/', async (req, res, next) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) return res.status(400).json({ message: 'Name and email are required.' });

    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: 'Email already registered.' });

    const user = new User({ name, email });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

// GET /api/users/:id - get user by id
router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found.' });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/users/:id - delete user
router.delete('/:id', async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found.' });
    res.json({ message: 'User deleted.' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
