const User = require('../../models/User');

const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).lean();
        res.json(user);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const editMe = async (req, res) => {
    try {
        const { userName, email, password, firstName, lastName } = req.body;
        const updatedUser = await User.findById(req.user.id);
        console.log(userName, email, password, firstName, lastName)
        if (userName) updatedUser.userName = userName;
        if (email) updatedUser.email = email;
        // decode the password

        if (firstName) updatedUser.firstName = firstName;
        if (lastName) updatedUser.lastName = lastName;
        const savedUser = await updatedUser.save();
        res.json(savedUser);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    editMe, getMe
}