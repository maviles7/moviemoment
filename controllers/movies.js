const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('../middleware/ensureLoggedIn');

const Movie = require('../models/movies');

// all paths start w/'/movies'

// GET /movies --> INDEX FUNCTIONALITY
router.get('/', ensureLoggedIn, async (req, res) => {
  const movies = await Movie.find({});
  res.render('movies/index.ejs', {movies});
});

// GET /movies/new --> NEW FUNCTIONALITY 
router.get('/new', ensureLoggedIn, (req, res) => {
  res.render('movies/new.ejs');
});

module.exports = router;