const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 2,
        trim: true
    },
    description: {
        type: String,
        required: true,
        minLength: 5,
        trim: true
    },
    casts: {
        type: [String],
        required: true
    },
    trailerUrl: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        default: "English",
        trim: true
    },
    releaseDate: {
        type: Date,
        required: true
    },
    director: {
        type: String,
        required: true,
        trim: true
    },
    releaseStatus: {
        type: String,
        enum: ["RELEASED", "UPCOMING", "BLOCKED"],
        default: "RELEASED"
    },
    poster: {
        type: String,
        required: true,
    }
}, { timestamps: true });

module.exports = mongoose.model('Movie', movieSchema);
