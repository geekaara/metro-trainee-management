const asyncHandler = require('express-async-handler');
const db = require('../test-db-connection'); // Adjust the path if necessary

// Handle user login on POST.
exports.user_login_post = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    try {
        // Check if the user exists in the database
        const [user] = await db.query("SELECT * FROM users WHERE email = ? AND password = ?", [email, password]);

        if (user.length === 0) {
            return res.status(401).send({ message: "Invalid email or password" });
        }

        // If the login is successful, you can set up a session or generate a token here
        res.status(200).send({ message: "Login successful" });
    } catch (error) {
        console.error("Failed to login user:", error.message);
        res.status(500).send({ message: "Failed to login user", error: error.message });
    }
});

// Handle user signup on POST.
exports.user_signup_post = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const [user] = await db.query("INSERT INTO users (email, password) VALUES (?, ?)", [email, password]);

        if (user.length === 0){
            return res.status(201).send({ message: "Invalid Credentials" });
        }
        res.status(201).send({ message: "User created successfully" });
    } catch (error) {
        console.error("Failed to create user:", error.message);
        res.status(500).send({ message: "Failed to create user", error: error.message });
    }
});

