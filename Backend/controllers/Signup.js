const bcrypt = require("bcrypt")
const User = require("../database/data");

async function SingUp(req, res) {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send("User already exists");
        }
        try {
            const hashPassword = await bcrypt.hash(password,10);
            const newUser = await User.create({name, email, password: hashPassword});
            
            await newUser.save();
        } catch (error) {
            if(err) 
                return res.status(401).send("Error creating user")
        }
        

        res.status(200).send("User created successfully");
    } catch (err) {
        console.error("Error creating user:", err);
        res.status(500).send("Error creating user");
    }
}

module.exports = SingUp