// Import the function we are testing
import { isValidURL } from '../src/client/js/urlChecker';

describe('Testing the URL validation functionality', () => {
    test('The isValidURL function should be defined', () => {
        expect(isValidURL).toBeDefined();
    });

    test('should return true for a valid URL', () => {
        const validUrl = 'https://www.udacity.com';
        expect(isValidURL(validUrl)).toBe(true);
    });

    test('should return false for an invalid URL', () => {
        const invalidUrl = 'not a url';
        expect(isValidURL(invalidUrl)).toBe(false);
    });

    test('should return false for an empty string', () => {
        expect(isValidURL('')).toBe(false);
    });
});