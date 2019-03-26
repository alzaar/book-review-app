const express = require('express');
const router = express();
//Load Profile Model
const Profile = require('../../model/profile')
//Load Mongoose and Passport for authentication and DB access
const mongoose = require('mongoose');
const passport = require('passport');
//Load User Model for profile to access it
const User = require('../../model/User');
//Validations
const validateProfileInput = require('../../validation/profile');
const validateBookInput = require('../../validation/book');
//@route  GET /api/profile/test
//@desc   Test route
//@access Public
router.get('/test', (req, res) => res.json({ msg: 'profile' }));

//@route  GET /api/profile
//@desc   Return a users profile
//@access Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
  .populate('users', ['name', 'email'])
  .then(profile => {
    const errors = {};
    if (!profile) {
      errors.noprofile = 'No such profile exists';
      return res.status(404).json(errors);
    }
    return res.json(profile)
  })
  .catch(err => res.status(404).json(err));
})

//@route  POST /api/profile
//@desc   Create and Edit Profile
//@access Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  //Validations
  const { errors, isValid } = validateProfileInput(req.body);

  if (!isValid) {
    console.log(123);
    return res.status(400).json(errors);
  }

  const profileFields = {};
  profileFields.user = req.user.id;
  if (req.body.handle) profileFields.handle = req.body.handle;
  if (req.body.bio) profileFields.bio = req.body.bio;
  //Books Read is an array which has objects so we need to iterate over the objects
  //Use different route for experiences as this requires a diff form
  Profile.findOne({ user: req.user.id })
  .then(profile => {
    if (profile) {
      //update
      Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      )
      .then(profile => res.json(profile))
    } else {
      //Create a new one and chck if handle exists
      Profile.findOne({ handle: profileFields.handle })
      .then(profile => {
        if (profile) {
          errors.handle = 'Handle already exists';
          return res.status(400).json(errors);
        }
        //Save
        Profile(profileFields).save().then(profile => res.json(profile))
      })

    }
  })
})

//@route GET /api/profile/all
//@desc Return all Profiles
//@access Public
router.get('/all', (req, res) => {
  const errors = {};
  Profile.find()
  .then(profiles => {
    if (!profiles) {
      errors.profiles = 'No profiles found'
      return res.status(404).json(errors)
    }
    return res.json(profiles);
  })
})

//@route GET /api/profile/handle/:handle
//@desc View user profile by handle
//@access Public
router.get('/handle/:handle', (req, res) => {
  const errors = {};

  Profile.findOne({ handle: req.params.handle })
  .then(profile => {
    if (!profile) {
      errors.profile = 'Profile does not exist';
      return res.status(404).json(errors);
    }
    return res.json(profile)
  })
})

//@route Get /api/profile/user/:user_id
//@desc View user profile by user_id
//@access Public
router.get('/user/:user_id', (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.params.user_id })
  .then(profile => {
    if (!profile) {
      errors.profile = 'Profile does not exist';
      return res.status(404).json(errors);
    }
    return res.json(profile)
  })
})

//@route POST /api/profile/booksread
//@desc add books read
//@access Private
router.post('/booksread', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validateBookInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  Profile.findOne({ user: req.user.id })
  .then(profile => {
    const err = {};
    if (!profile) {
      err.profile = 'No Profile found';
      return res.status(404).json(err)
    }
    const bookDetails = {
      title: req.body.title,
      author: req.body.author,
      yearRead: req.body.yearread,
      rating: req.body.rating,
      recommendBook: req.body.recommendbook
    };

    profile.booksRead.unshift(bookDetails);

    profile.save().then(profile => res.json(profile))
  })
})

//@route DELETE /api/profile/booksread/:booksread
//@desc Delete a book
//@access PRIVATE
router.delete('/booksread/:booksread_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
  .then(profile => {
    //Get remove index
    const removeIndex = profile.booksRead.map(book => book.id).indexOf(req.params.booksread_id);
    //Splice Array
    profile.booksRead.splice(removeIndex, 1);
    //Save Profile
    profile.save().then(profile => res.json(profile));
  })
})
module.exports = router;
