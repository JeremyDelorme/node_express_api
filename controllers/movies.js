import { ObjectId } from 'mongodb'; // Import ObjectId

// Create a new movie and add it to the database
export const createMovie = (db) => async (req, res) => {
    try {
        const movieData = req.body;
        const result = await db.collection('movies').insertOne(movieData);
        res.send(`Movie titled "${movieData.title}" added to the database`);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Get a list of all movies in the database
export const getMovies = (db) => async (req, res) => {
    try {
        const movies = await db.collection('movies').find().toArray();
        res.json(movies);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Get a specific movie by its ID
export const getMovieByID = (db) => async (req, res) => {
    try {
        const movieId = ObjectId(req.params.movieId); // Convert the ID to ObjectId
        const movie = await db.collection('movies').findOne({ _id: movieId });

        if (!movie) {
            res.status(404).send('Movie not found');
        } else {
            res.json(movie);
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Update movie information based on its ID
export const updateMovie = (db) => async (req, res) => {
    try {
        const { movieId } = req.params;
        const { title, description, genre } = req.body;
        const movieObjectId = ObjectId(movieId); // Convert the ID to ObjectId

        const result = await db.collection('movies').updateOne(
            { _id: movieObjectId },
            { $set: { title, description, genre } }
        );

        if (result.modifiedCount === 0) {
            res.status(404).send('Movie not found');
        } else {
            res.send(`Movie with the id ${movieId} has been updated`);
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Delete a movie based on its ID
export const deleteMovie = (db) => async (req, res) => {
    try {
        const { movieId } = req.params;
        const movieObjectId = ObjectId(movieId); // Convert the ID to ObjectId

        const result = await db.collection('movies').deleteOne({ _id: movieObjectId });

        if (result.deletedCount === 0) {
            res.status(404).send('Movie not found');
        } else {
            res.send(`Movie with the id ${movieId} deleted from the database`);
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}
