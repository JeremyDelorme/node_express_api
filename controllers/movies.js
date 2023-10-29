import { ObjectId } from 'mongodb';

// JSON object template for movie data
const movieTemplate = {
    "Name": "Clockwork Orange",
    "Year": "1971",
    "Director": "Stanley Kubrick",
    "Country": "United Kingdom",
    "ShortDescription": "In the dystopian near future, a delinquent named Alex leads a gang of thugs. After his arrest, he undergoes an experimental aversion therapy to cure his violent tendencies.",
    "PosterImage": "https://example.com/clockwork_orange_poster.jpg",
    "Genre": "Dystopian"
};

// CreateMovie controller in controllers/movies.js
export const createMovie = (db) => async (req, res) => {
    try {
        // Check if the request body is an array of JSON objects
        if (Array.isArray(req.body)) {
            // If it's an array, insert each object into the database
            const result = await db.collection('movies').insertMany(req.body);
            res.send(`Added ${result.insertedCount} movies to the database.`);
        } else {
            // If it's a single object, insert it into the database
            const movieData = req.body;
            const result = await db.collection('movies').insertOne(movieData);
            res.send(`Movie titled "${movieData.Name}" added to the database`);
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}


// Get a list of all movies in the database
export const getMovies = (db) => async (req, res) => {
    try {
        const movies = await db.collection('movies').find().toArray();
        res.send(`List of all movies: ${movies.map(movie => `"${movie.Name}" (${movie.Year}) directed by ${movie.Director}`).join(', ')}`);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Get a specific movie by its ID
export const getMovieByID = (db) => async (req, res) => {
    try {
        const movieId = ObjectId(req.params.movieId);
        const movie = await db.collection('movies').findOne({ _id: movieId });

        if (!movie) {
            res.status(404).send('Movie not found');
        } else {
            res.send(`Movie titled "${movie.Name}" (${movie.Year}) directed by ${movie.Director}, from ${movie.Country}, and described as "${movie.ShortDescription}". Genre: ${movie.Genre}.`);
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Update movie information based on its ID
export const updateMovie = (db) => async (req, res) => {
    try {
        const { movieId } = req.params;
        const { Name, Year, Director, Country, ShortDescription, PosterImage, Genre } = req.body;
        const movieObjectId = ObjectId(movieId);

        const result = await db.collection('movies').updateOne(
            { _id: movieObjectId },
            {
                $set: {
                    Name,
                    Year,
                    Director,
                    Country,
                    ShortDescription,
                    PosterImage,
                    Genre
                }
            }
        );

        if (result.modifiedCount === 0) {
            res.status(404).send('Movie not found');
        } else {
            res.send(`Movie with the id ${movieId} has been updated. New details: "${Name}" (${Year}), genre: ${Genre}.`);
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Delete a movie based on its ID
export const deleteMovie = (db) => async (req, res) => {
    try {
        const { movieId } = req.params;
        const movieObjectId = ObjectId(movieId);

        const result = await db.collection('movies').deleteOne({ _id: movieObjectId });

        if (result.deletedCount === 0) {
            res.status(404).send('Movie not found');
        } else {
            res.send(`Movie with the id ${movieId} ("${movie.Name}") has been deleted from the database.`);
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}
