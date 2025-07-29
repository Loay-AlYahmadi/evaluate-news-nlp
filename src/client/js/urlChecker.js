/**
 * @file This file contains the URL validation logic.
 * @description It exports a function to check if a given string is a valid,
 * well-formed URL.
 */

/**
 * @description Validates if the provided string is a valid URL.
 * @param {string} urlString - The string to be validated.
 * @returns {boolean} - True if the URL is valid, false otherwise.
 */
function isValidURL(urlString) {
    // First, check if the input string is empty or null.
    if (!urlString || urlString.trim() === '') {
        return false;
    }

    // Use a regular expression to check for a valid URL format.
    // This regex checks for http/https, a domain name, and optional path.
    const urlRegex = new RegExp(
        '^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', // fragment locator
        'i'
    );

    return urlRegex.test(urlString);
}

export { isValidURL };