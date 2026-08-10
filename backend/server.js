const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Home route
app.get('/', (req, res) => {
    res.send('🚀 PrintsOne Backend Running 24x7');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});