import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';
import moviesRoutes from './routes/movies.js';
import usersRoutes from './routes/users.js';

const app = express();
const PORT = 4000;

app.use(bodyParser.json());

const mongoURI = 'mongodb+srv://JeremyDelormeWeb:MongoDB23.7@cluster0.f3yvhoe.mongodb.net/your-database-name?retryWrites=true&w=majority'; // Replace 'your-database-name' with your actual database name

MongoClient.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((client) => {
        const db = client.db('your-database-name'); // Replace 'your-database-name' with your actual database name
        app.use('/movies', moviesRoutes(db));
        app.use('/users', usersRoutes(db));
        app.get('/', (req, res) => res.send('Hello from Homepage.'));
        app.listen(PORT, 'localhost', () => console.log(`Server running on port: http://localhost:${PORT}`));
    })
    .catch((err) => console.error(err));
