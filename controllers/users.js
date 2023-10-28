import { ObjectId } from 'mongodb'; // Import ObjectId

// Get a list of all users in the database
export const getUsers = (db) => async (req, res) => {
    try {
        const users = await db.collection('users').find().toArray();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Get a specific user by their ID
export const getUserID = (db) => async (req, res) => {
    try {
        const userId = ObjectId(req.params.userId); // Convert the ID to ObjectId
        const user = await db.collection('users').findOne({ _id: userId });

        if (!user) {
            res.status(404).send('User not found');
        } else {
            res.json(user);
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Create a new user and add it to the database
export const createUser = (db) => async (req, res) => {
    try {
        const user = req.body;
        const result = await db.collection('users').insertOne(user);
        res.send(`User with the name ${user.firstName} added to the database`);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Update user information based on their ID
export const updateUser = (db) => async (req, res) => {
    try {
        const { userId } = req.params;
        const { firstName, lastName, age } = req.body;
        const userObjectId = ObjectId(userId); // Convert the ID to ObjectId

        const result = await db.collection('users').updateOne(
            { _id: userObjectId },
            { $set: { firstName, lastName, age } }
        );

        if (result.modifiedCount === 0) {
            res.status(404).send('User not found');
        } else {
            res.send(`User with the id ${userId} has been updated`);
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Delete a user based on their ID
export const deleteUser = (db) => async (req, res) => {
    try {
        const { userId } = req.params;
        const userObjectId = ObjectId(userId); // Convert the ID to ObjectId

        const result = await db.collection('users').deleteOne({ _id: userObjectId });

        if (result.deletedCount === 0) {
            res.status(404).send('User not found');
        } else {
            res.send(`User with the id ${userId} deleted from the database`);
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}
