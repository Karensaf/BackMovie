const mongoose = require('mongoose')

const movieSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    adult: {
        type: String,
        required: [true, 'Por favor escribe false']
    },
    backdrop_path: {
        type: String,
        required: [true, 'Por favor escribe el url']
    },
    genre_ids: {
        type: Number,
        required: [true, 'Por favor escribe los ids']
    },
    id: {
        type: Number,
        required: [true, 'Por favor escribe el id']
    },
    original_language: {
        type: String,
        required: [true, 'Por favor escribe las primeras letras del idioma']
    },
    original_title: {
        type: String,
        required: [true, 'Por favor escribe el nombre real de la peli']
    },
    overview: {
        type: String,
        required: [true, 'Por favor escribe una descripcion de la peli']
    },
    popularity: {
        type: Number,
        required: [true, 'Por favor escribe la popularidad']
    },
    poster_path: {
        type: String,
        required: [true, 'Por favor escribe el link de la imagen']
    },
    release_date: {
        type: String,
        required: [true, 'Por favor escribe la fecha de estreno de la peli']
    },
    title: {
        type: String,
        required: [true, 'Por favor escribe el nombre de la peli']
    }
    ,
    vote_average: {
        type: Number,
        required: [true, 'Por favor escribe el voto promedio']
    }
    ,
    vote_count: {
        type: Number,
        required: [true, 'Por favor los votos']
    }

}, {
    timestamps: true  //? Esto es para definir la fecha de creación y de actualización o modificación
})

module.exports = mongoose.model('Movie', movieSchema)