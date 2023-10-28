import express from 'express';
import {
    createMovie,
    getMovies,
    getMovieByID,
    updateMovie,
    deleteMovie,
} from '../controllers/movies.js';

const router = express.Router();

const moviesRoutes = (db) => {
    router.post('/', createMovie(db));
    router.get('/', getMovies(db));
    router.get('/:movieId', getMovieByID(db));
    router.patch('/:movieId', updateMovie(db));
    router.delete('/:movieId', deleteMovie(db));

    return router;
};

export default moviesRoutes;
