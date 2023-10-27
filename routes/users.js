import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

const users = []

router.get('/', (req, res) => {
    res.json(users);
});

router.post("/", (req, res) => {
    const user = req.body;
    const generatedUUID = uuidv4(); // Generate a UUID
    users.push({ ...user, id: generatedUUID }); // Add the UUID to the user
    res.send(`User with the name ${user.firstName} added to the database`);
});

// New route to get the UUID for a specific user
router.get('/:userId', (req, res) => {
    const userId = req.params.userId;
    const user = users.find(u => u.id === userId);

    if (!user) {
        res.status(404).send('User not found');
    } else {
        res.json({ id: user.id });
    }
});

export default router;
