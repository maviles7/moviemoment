const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('../middleware/ensureLoggedIn');

const Movie = require('../models/movie');
const User = require('../models/user');

// all paths start w/'/profiles'

// GET /profiles --> INDEX FUNCTIONALITY 
router.get('/', ensureLoggedIn, async (req, res) => {
    const profiles = await User.find({});
    console.log(profiles);
    res.render('profiles/index.ejs', { profiles });
});

// GET /profiles/:profileId --> SHOW FUNCTIONALITY 
router.get('/:profileId', ensureLoggedIn, async (req, res) => {
    const profiles = await User.find({});
    const movies = await Movie.find({ viewer: req.params.profileId });
    console.log(movies);
    res.render('profiles/show.ejs', { profiles, movies });
});

module.exports = router;