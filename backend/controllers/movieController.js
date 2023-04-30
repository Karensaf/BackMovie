const asyncHandler = require('express-async-handler')
const Movie = require ('../models/movieModel')

const getMovies = asyncHandler ( async (req, res) => {
    // res.status(200).json({mensaje: 'Mostrar las pelis'})
    const movies = await Movie.find({user: req.user.id})
    res.status(200).json(movies)
})

const setMovies = asyncHandler (async (req, res) => {
    if(!req.body.adult || !req.body.backdrop_path || !req.body.genre_ids || !req.body.id || (!req.body.original_language) || (!req.body.original_title) || (!req.body.overview) || (!req.body.popularity) || (!req.body.poster_path) || (!req.body.release_date) || (!req.body.title) || (!req.body.video) || (!req.body.vote_average) || (!req.body.vote_count)){     
        
        res.status(400)
        throw new Error('Favor de escribir la informacion correcta de la película')
    }

    const movie = await Movie.create({
        adult: req.body.adult,
        backdrop_path: req.body.backdrop_path,
        genre_ids: req.body.genre_ids,
        id: req.body.id,
        original_language: req.body.original_language,
        original_title: req.body.original_title,
        overview: req.body.overview,
        popularity: req.body.popularity,
        poster_path: req.body.poster_path,
        release_date: req.body.release_date,
        title: req.body.title,
        video: req.body.video,
        vote_average: req.body.vote_average,
        vote_count: req.body.vote_count,
        user: req.user.id
    })

    res.status(201).json(movie)
    
})


const updateMovies = asyncHandler ( async (req, res) => {
    // res.status(200).json({mensaje: `Modificar la peli ${req.params.id}`})
    const movie = await    Movie.findById(req.params.id)

    if (!movie) {
        res.status(400)
        throw new Error('Película no encontrada')
    }

    //? Verificamos q el auto pertenece al usuario del token 
    if(movie.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('Acceso No Autorizado, la película no pertenece al usuario logeado')
    }

    const movieModificada = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true })

    res.status(200).json(movieModificada)
})


const deleteMovies = asyncHandler ( async (req, res) => {
    // res.status(200).json({mensaje: `Borrar el peli ${req.params.id}`})
    const movie = await    Movie.findById(req.params.id)

    if (!movie) {
        res.status(400)
        throw new Error('Película no encontrada')
    }

    if(movie.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('Acceso No Autorizado, la película no pertenece al usuario logeado')
    }

    await movie.deleteOne()
    
    res.status(200).json({id: req.params.id})
})




module.exports = {
    getMovies,
    setMovies, 
    updateMovies, 
    deleteMovies
}
