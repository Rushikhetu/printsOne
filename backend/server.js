require('dotenv').config();
require('./config/db');

const express = require('express');
const cors = require('cors');
const db = require('./config/db');

const authRoutes = require('./routes/authRoutes');

const app = express();
const stickerRoutes =
    require("./routes/stickerRoutes");

app.use(
    "/api/stickers",
    stickerRoutes
);
// Allow frontend requests
app.use(cors({
    origin: '*'
}));

app.use(express.json());

app.get('/', (req, res) => {
    res.send('🚀 PrintsOne Backend Running 24x7');
});

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
app.get('/test-db', (req, res) => {
    db.query('SELECT 1', (err, result) => {
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        res.json({
            success: true,
            result
        });
    });
});