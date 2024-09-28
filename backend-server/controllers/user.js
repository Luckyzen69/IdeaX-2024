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


const getUserDetails = async (req, res) => {
    try {
        const email = req.params.email;
        console.log(email)
        const user = await User.findOne({email:email});
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user details', error: error.message });
    }
};

module.exports = { createUser,getUserDetails };