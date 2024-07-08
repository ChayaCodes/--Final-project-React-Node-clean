const User = require('../../models/User');
const bcrypt = require('bcrypt');

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
        const { userName, email, password, firstName, lastName, newPassword } = req.body;
        const updatedUser = await User.findById(req.user.id);
        console.log(userName, email, password, firstName, lastName)
        if (userName) updatedUser.userName = userName;
        if (email) updatedUser.email = email;
        // decode the password
        if (password && newPassword && bcrypt.compareSync(password, updatedUser.password)) {
            if (newPassword.trim().length > 0) {
                const hashedPassword = await bcrypt.hash(newPassword, 10);
                updatedUser.password = hashedPassword;
            } else {
                return res.status(400).json({ message: "New password is required." });
            }
        } 
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