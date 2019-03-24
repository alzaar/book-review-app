const express = require('express');
const router = express();

//@route  GET /api/post/test
//@desc   Test route
//@access Public
router.get('/test', (req, res) => res.json({ msg: 'post' }));

module.exports = router;
