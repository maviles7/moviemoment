const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('../middleware/ensureLoggedIn');

const Movie = require('../models/movie');
const User = require('../models/user');

// all paths start w/'/profiles'

// GET /profiles --> INDEX FUNCTIONALITY 
router.get('/', ensureLoggedIn, async (req, res) => {
    //res.send('list of profiles go here');
    const profiles = await User.find({});
    console.log(profiles);
    res.render('profiles/index.ejs', { profiles });
});

module.exports = router;