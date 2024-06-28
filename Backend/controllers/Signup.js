const bcrypt = require("bcrypt")
const User = require("../database/data");

async function SingUp(req, res) {
    const { name, username, password } = req.body;

    try {
        
        const hashPassword = await bcrypt.hash(password,10);
        const newUser = await User.create({name, username, password: hashPassword});
        
        await newUser.save();

        res.status(201).send("User created successfully");
    } catch (err) {
        console.error("Error creating user:", err);
        res.status(500).send("Error creating user");
    }
}

module.exports = SingUp