const express = require('express');
const router = express();
//Encrypter
const bcrypt = require('bcryptjs');
//Load Model
const User = require('../../model/User');

//@route  GET /api/user/test
//@desc   Test route
//@access Public
router.get('/test', (req, res) => res.json({ msg: 'user' }));

//@route  POST /api/user/register
//@desc   register a user
//@access Public

router.post('/register', (req, res) => {
  console.log(req.body);
  User.findOne({ email: req.body.email })
  .then(user => {
    if (user) return res.status(400).json({ email: 'email already exists' });
    else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save()
          .then(user => res.json(user))
          .catch(err => console.log(err))
        })
      })
    }
  })
})

module.exports = router;
