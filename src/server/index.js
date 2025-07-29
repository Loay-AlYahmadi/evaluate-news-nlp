/**
 * @file This file is the main entry point for the server-side application.
 * @description It sets up an Express server to handle API requests. The server
 * serves the static front-end files and provides an endpoint for analyzing text
 * from a URL using a web scraper and an external NLP API.
 */

// Load environment variables from a .env file into process.env
const dotenv = require('dotenv');
dotenv.config();

// Import required dependencies
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');
const path = require('path');

// Initialize the Express application
const app = express();

// Apply middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Use the built-in Express middleware for parsing JSON

// Serve static files from the 'dist' directory
app.use(express.static('dist'));

/**
 * @description Scrapes the text content from a given URL.
 * @param {string} url - The URL of the webpage to scrape.
 * @returns {Promise<string|null>} A promise that resolves to the first 200 characters of the scraped text, or null if failed.
 */
async function scrapeTextFromURL(url) {
    try {
        console.log(`Fetching and scraping text from URL: ${url}`);

        // Let's make our request look more like a real browser
        const { data } = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5',
                'Accept-Encoding': 'gzip, deflate, br',
                'DNT': '1',
                'Connection': 'keep-alive',
                'Upgrade-Insecure-Requests': '1'
            }
        });

        const $ = cheerio.load(data);
        const text = $('body').text().trim();

        if (!text) {
            console.error('No text content found at the provided URL');
            return null;
        }

        const trimmedText = text.slice(0, 200);
        console.log(`Extracted Text (200 characters):\n${trimmedText}`);
        return trimmedText;
    } catch (error) {
        console.error('Error while scraping text from the URL:', error.message);
        throw new Error('Failed to scrape text from the URL');
    }
}

/**
 * @description Defines the /analyze-url POST endpoint for processing a URL.
 * It scrapes text from the provided URL, sends it to the NLP API,
 * and returns the analysis to the client.
 * @param {object} req - The request object, containing the URL in the body.
 * @param {object} res - The response object.
 */
app.post('/analyze-url', async (req, res) => {
    const { url } = req.body;

    if (!url) {
        console.error('No URL provided in the request body');
        return res.status(400).json({ error: 'URL is required' });
    }

    try {
        // Step 1: Scrape text from the provided URL
        const text = await scrapeTextFromURL(url);
        if (!text) {
            return res.status(400).json({ error: 'No text content found at the provided URL' });
        }

        // Step 2: Send the extracted text to the Udacity NLP API using the endpoint from .env
        const analysisResponse = await axios.post(process.env.API_ENDPOINT, { text });
        // Step 3: Send the NLP analysis results back to the client
        return res.json(analysisResponse.data);

    } catch (error) {
        console.error('Error during URL processing or API request:', error.message);
        return res.status(500).json({ error: 'Failed to analyze the URL' });
    }
});

/**
 * @description Serves the main index.html file when the root URL is requested.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
app.get('/', (req, res) => {
    res.sendFile(path.resolve('dist/index.html'));
});

// Start the server
const port = 8081;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});