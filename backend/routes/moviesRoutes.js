const express = require('express')
const router = express.Router()
const { getMovies, setMovies, updateMovies, deleteMovies } = require('../controllers/movieController')
const { protect } = require ('../middleware/authMiddleware')


router.route('/').get(protect, getMovies).post(protect, setMovies)
router.route('/:id').put(protect, updateMovies).delete(protect, deleteMovies)




module.exports = router