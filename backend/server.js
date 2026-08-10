const express = require('express');
const cors = require('cors');
const db = require('./config/db');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/test-db', (req, res) => {
    db.query('SELECT * FROM test_connection', (err, results) => {
        if (err) {
            return res.status(500).json(err);
        }

        res.json(results);
    });
});

app.listen(5000, () => {
    console.log('🚀 Server running on http://localhost:5000');
});