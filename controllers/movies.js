const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('../middleware/ensureLoggedIn');

const Movie = require('../models/movie');

// all paths start w/'/movies'

// GET /movies --> INDEX FUNCTIONALITY
router.get('/', ensureLoggedIn, async (req, res) => {
  const movies = await Movie.find({}).populate('viewer');
  console.log('movie:', movies)
  res.render('movies/index.ejs', { movies });
});

// GET /movies/new --> NEW FUNCTIONALITY 
router.get('/new', ensureLoggedIn, (req, res) => {
  const genres = Movie.schema.path('genre').enumValues
  const ratings = Movie.schema.path('rating').enumValues
  res.render('movies/new.ejs', { genres, ratings });
});

// POST /movies --> CREATE FUNCTIONALITY 
router.post('/', async (req, res) => {
  try {
    req.body.viewer = req.user._id;
    console.log(req.body.viewer);
    req.body.dateWatched += 'T00:00'; // prevent 1 day off error  
    await Movie.create(req.body);
  } catch (error) {
    console.log(error);
  }
  res.redirect('/movies');
});

// // GET /movies/:movieId --> SHOW FUNCTIONALITY 
// router.get('/:movieId', async (req, res) => {
//   const movie = await Movie.findById(req.params.movieId);
//   res.render('movies/show.ejs', { movie });
// });

// DELETE /movies/:movieId --> DELETE FUNCTIONALITY 
// router.delete('/:movieId', async (req, res) => {
// });

module.exports = router;