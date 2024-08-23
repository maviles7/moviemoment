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
        enum: ['action', 'adventure', 'animated', 'comedy', 'drama', 'documentary', 'historical', 'horror', 'musical', 'romance', 'thriller']
    }, 
    rating: {
        type: String, 
        enum: ['⭐️', '⭐️⭐️', '⭐️⭐️⭐️', '⭐️⭐️⭐️⭐️', '⭐️⭐️⭐️⭐️⭐️'],
        required: true,
    },
    review: {
        type: String,
    }, 
    viewer: {
        // referenceing the User
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true, 
    },
});

module.exports = mongoose.model('Movie', movieSchema);