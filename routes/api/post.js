const express = require('express');
const router = express();
//Load Post Model
const Post = require('../../model/Post');
//Load Passport for authentication
const passport = require('passport');
//Load Validations
const validatePostInput = require('../../validation/post');
//@route  GET /api/post/test
//@desc   Test route
//@access Public
router.get('/test', (req, res) => res.json({ msg: 'post' }));
//@route  POST /api/post/
//@desc   Get all Posts
//@access Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validatePostInput(req.body);
  console.log(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const newPost = new Post({
    text: req.body.text,
    name: req.body.name,
    user: req.user.id
  });

  newPost.save().then(post => res.json(post));
})

module.exports = router;
