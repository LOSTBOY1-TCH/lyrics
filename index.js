// server.js

const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Define the /api/lyrics endpoint
app.get('/api/lyrics', async (req, res) => {
    const { artist, title, clientApiKey } = req.query;

    // Validate input
    if (!artist || !title || !clientApiKey) {
        return res.status(400).json({ error: 'Missing required parameters' });
    }

    try {
        // Replace with your actual lyrics API URL and logic
        const response = await axios.get(`https://api.lyrics.ovh/v1/${artist}/${title}`);
        
        // Send the lyrics back to the client
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching lyrics' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
