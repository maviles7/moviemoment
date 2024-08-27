const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('../middleware/ensureLoggedIn');

const Movie = require('../models/movie');

// all paths start w/'/movies'

// GET /movies --> INDEX FUNCTIONALITY
router.get('/', ensureLoggedIn, async (req, res) => {
  const movies = await Movie.find({viewer: req.user._id}).populate('viewer');
  res.render('movies/index.ejs', { movies });
});

// GET /movies/new --> NEW FUNCTIONALITY 
router.get('/new', ensureLoggedIn, (req, res) => {
  const genres = Movie.schema.path('genre').enumValues
  const ratings = Movie.schema.path('rating').enumValues
  res.render('movies/new.ejs', { genres, ratings });
});

// GET /movies/:movieId --> SHOW FUNCTIONALITY 
router.get('/:movieId', async (req, res) => {
  const movie = await Movie.findById(req.params.movieId);
  res.render('movies/show.ejs', { movie });
});

// GET /movies/:movieID/edit --> EDIT FUNCTIONALITY
router.get('/:movieId/edit', async (req, res) => {
  const movie = await Movie.findById(req.params.movieId);
  const genres = Movie.schema.path('genre').enumValues
  const ratings = Movie.schema.path('rating').enumValues
  const dateWatched = new Date(movie.dateWatched).toISOString().slice(0,10);
  console.log(movie)
  console.log(dateWatched);
  res.render('movies/edit.ejs', { movie, genres, ratings, dateWatched });
});

// POST /movies --> CREATE FUNCTIONALITY 
router.post('/', async (req, res) => {
  try {
    req.body.dateWatched += 'T00:00'; // prevent 1 day off error 
    req.body.viewer = req.user._id;
    await Movie.create(req.body);
  } catch (error) {
    console.log(error);
  }
  res.redirect('/movies');
});

// DELETE /movies/:movieId --> DELETE FUNCTIONALITY 
router.delete('/:movieId', async (req, res) => {
  await Movie.findByIdAndDelete(req.params.movieId);
  res.redirect('/');
});

// UPDATE /movies/:movieId --> UPDATE FUNCTIONALITY 
router.put('/:movieId', async (req, res) => {
  const updateMovie = await Movie.findByIdAndUpdate({_id: req.params.movieId}, req.body, {new: true});
  res.redirect(`/movies/${updateMovie._id}`);
});

module.exports = router;