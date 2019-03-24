const express = require('express');
const router = express();

//@route  GET /api/profile/test
//@desc   Test route
//@access Public
router.get('/test', (req, res) => res.json({ msg: 'profile' }));

module.exports = router;
