const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Route for fetching lyrics
app.get('/api/lyrics', async (req, res) => {
    const { artist, title, clientApiKey } = req.query;

    // Validate required parameters
    if (!artist || !title || !clientApiKey) {
        return res.status(400).json({ error: 'Artist, title, and client API key are required' });
    }

    // Here you can validate the client API key if needed
    // For example, you could check if it matches a known value
    if (clientApiKey !== process.env.CLIENT_API_KEY) {
        return res.status(403).json({ error: 'Invalid client API key' });
    }

    try {
        const response = await axios.get(`https://api.lyrics.ovh/v1/${artist}/${title}`, {
            headers: {
                'Authorization': `Bearer ${process.env.LYRICS_API_KEY}` // Use your lyrics API key here
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error(error);
        if (error.response && error.response.status === 404) {
            return res.status(404).json({ error: 'Lyrics not found' });
        }
        res.status(500).json({ error: 'An error occurred while fetching lyrics' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
