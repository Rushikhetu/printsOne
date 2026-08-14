const db = require('../config/db');
const bcrypt = require('bcryptjs');

// ---------------- SIGNUP ----------------
// ---------------- SIGNUP ----------------
const signup = async (req, res) => {
    const { name, email, phone, password } = req.body;

    // Email validation
    const validEmail = /@(gmail\.com|outlook\.com|hotmail\.com|yahoo\.com)$/i;

    if (!validEmail.test(email)) {
        return res.status(400).json({
            message: 'Invalid email address'
        });
    }

    if (!name || !email || !phone || !password) {
        return res.status(400).json({
            message: 'All fields are required'
        });
    }

    // Check existing email or phone
    db.query(
        'SELECT * FROM users WHERE email = ? OR phone = ?',
        [email, phone],
        async (err, results) => {

            // ✅ check database error
            if (err) {
                return res.status(500).json({
                    message: 'Database error'
                });
            }

            if (results.length > 0) {
                return res.status(409).json({
                    message: 'Email or phone already exists'
                });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            db.query(
                'INSERT INTO users(name,email,phone,password) VALUES(?,?,?,?)',
                [name, email, phone, hashedPassword],
                (err) => {
                    if (err) {
                        return res.status(500).json({
                            message: 'Failed to create account'
                        });
                    }

                    res.status(201).json({
                        message: 'Account created successfully'
                    });
                }
            );
        }
    );
};

// ---------------- LOGIN ----------------
const login = (req, res) => {
    console.log('LOGIN REQUEST:', req.body);

    const { identifier, password } = req.body;

    db.query(
        'SELECT * FROM users WHERE email = ? OR phone = ?',
        [identifier, identifier],
        async (err, results) => {

            console.log('DB RESULTS:', results);

            if (err) {
                return res.status(500).json({
                    message: 'Database error'
                });
            }

            if (results.length === 0) {
                return res.status(401).json({
                    message: 'Invalid email or phone'
                });
            }

            const user = results[0];

            const valid = await bcrypt.compare(password, user.password);

            console.log('PASSWORD VALID:', valid);

            if (!valid) {
                return res.status(401).json({
                    message: 'Invalid password'
                });
            }

            res.json({
                message: 'Login successful',
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone
                }
            });
        }
    );
};

// ---------------- EXPORTS ----------------
module.exports = {
    signup,
    login
};