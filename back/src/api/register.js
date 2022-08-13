const express = require('express');
const User = require('../models/user');

const router = express.Router();

router.post('/clients', async (req, res) => {
  const { name, mobile, email, message } = req.body;

  const client = User({
    name,
    email,
    mobile,
    message,
  });
  const savedUser = await client.save().catch((err) => {
    console.log(err);
    res.json({ error: 'cannot Sent user at the moment' });
  });

  if (savedUser)
    res.json({
      msg: 'User Sent successfully',
    });
});

module.exports = router;
