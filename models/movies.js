const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const movieSchema = new Schema ({
    movieTitle: {
        type: String, 
        required: true, 
    }, 
    dateWatched: {
        type: Date,
    }, 
    genre: {
        type: String, 
        enum: ['action', 'adenture', 'animated', 'comedy', 'drama', 'documentary', 'historical', 'horror', 'musical', 'romance', 'thriller']
    }, 
    rating: {
        type: Number, 
        enum: ['1', '2', '3', '4', '5'],
        required: true,
    },
    review: {
        type: String,
    }
});

module.exports = mongoose.model('Movie', movieSchema);