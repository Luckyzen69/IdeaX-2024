const User = require('../models/user');

const createUser = async (req, res) => {
    try {
        console.log('in create user ')
        const userData = req.body;
        const newUser = new User(userData);
        await newUser.save();
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
};

module.exports = { createUser };