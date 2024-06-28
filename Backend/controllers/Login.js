const bcrypt = require("bcrypt");
const User = require("../database/data");

async function Login(req, res) {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).send("User not found");
        }

        // Compare passwords
        const passwordMatch = await bcrypt.compare(password, user.password);

        console.log("User:", user);
        console.log("Stored Hashed Password:", user.password);
        console.log("Password Match:", passwordMatch);

        if (!passwordMatch) {
            return res.status(401).send("Invalid password");
        }

        res.status(200).send("Login successful");
    } catch (err) {
        console.error("Error signing in:", err);
        res.status(500).send("Error signing in");
    }
}

module.exports = Login;
