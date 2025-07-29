/**
 * @file This file contains the main logic for handling form submissions.
 * @description It orchestrates the process of validating user input, sending it
 * to the backend for analysis, and displaying the results on the UI.
 */

// Import the URL validation function from its module.
import { isValidURL } from './urlChecker';

/**
 * @description This function is called when the user submits the form.
 * @param {Event} event - The event object from the form submission.
 */
async function handleSubmit(event) {
    // Prevent the default form submission behavior which reloads the page.
    event.preventDefault();

    // Get the URL entered by the user from the input field with id 'url'.
    const url = document.getElementById('url').value;

    // Get the element where results will be displayed.
    const resultsElement = document.getElementById('results');

    // Validate the URL using the imported function.
    if (!isValidURL(url)) {
        resultsElement.innerHTML = 'Error: Please enter a valid URL.';
        return;
    }

    // If the URL is valid, show a loading message.
    resultsElement.innerHTML = 'Analyzing... Please wait.';

    try {
        // Send a POST request to our server's /analyze-url endpoint.
        const response = await fetch('http://localhost:8081/analyze-url', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: url }) // Send the URL in the request body.
        });

        // Parse the JSON response from the server.
        const data = await response.json();

        // Check if the server returned an error.
        if (data.error) {
            resultsElement.innerHTML = `Error: ${data.error}`;
        } else {
        // If successful, format and display the results in the UI.
        resultsElement.innerHTML = `
            <h2>Analysis Results:</h2>
            <p><strong>Sentiment:</strong> ${data.sentiment}</p>
            `;
        }
    } catch (error) {
        // Handle any network or server errors.
        console.error('Error:', error);
        resultsElement.innerHTML = 'An error occurred while communicating with the server.';
    }
}

export { handleSubmit };