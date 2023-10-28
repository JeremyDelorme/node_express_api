import express from 'express';
import {
    getUsers,
    getUserID,
    createUser,
    updateUser,
    deleteUser,
} from '../controllers/users.js';

const router = express.Router();

const usersRoutes = (db) => {
    router.get('/', getUsers(db));
    router.get('/:userId', getUserID(db));
    router.post('/', createUser(db));
    router.patch('/:userId', updateUser(db));
    router.delete('/:userId', deleteUser(db));

    return router;
};

export default usersRoutes;
