const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = (pool) => {
    // Generate JWT
    const generateToken = (id) => {
        return jwt.sign({ id }, process.env.JWT_SECRET, {
            expiresIn: '30d',
        });
    };

    // Register User
    router.post('/register', async (req, res) => {
        const { name, email, password } = req.body;

        try {
            const connection = await pool.getConnection();

            // Check if user exists
            const [users] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);
            if (users.length > 0) {
                connection.release();
                return res.status(400).json({ message: 'User already exists' });
            }

            // Hash password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Create user
            const [result] = await connection.query(
                'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
                [name, email, hashedPassword]
            );

            // Create default preferences
            await connection.query(
                'INSERT INTO user_preferences (user_id) VALUES (?)',
                [result.insertId]
            );

            connection.release();

            res.status(201).json({
                _id: result.insertId,
                name,
                email,
                token: generateToken(result.insertId),
            });
        } catch (error) {
            console.error('Registration Error:', error);
            res.status(500).json({ message: 'Server error during registration' });
        }
    });

    // Login User
    router.post('/login', async (req, res) => {
        const { email, password } = req.body;

        try {
            const connection = await pool.getConnection();

            // Check for user
            const [users] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);
            connection.release();

            if (users.length === 0) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }

            const user = users[0];

            // Check password
            const isMatch = await bcrypt.compare(password, user.password_hash);
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }

            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user.id),
            });
        } catch (error) {
            console.error('Login Error:', error);
            res.status(500).json({ message: 'Server error during login' });
        }
    });

    return router;
};
