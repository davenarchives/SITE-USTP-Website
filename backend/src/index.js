const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const express = require('express');
const cors = require('cors');
const imageRoutes = require('./routes/imageRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Allow all CORS for now, can be restricted to frontend domain later
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', imageRoutes);

app.get('/', (req, res) => {
    res.send('Site USTP Officer Backend Running');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
