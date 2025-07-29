/**
 * @file This is the main entry point for the client-side application.
 * @description It imports necessary functions and styles and sets up the event
 * listener for the form submission.
 */

import { handleSubmit } from './js/formHandler';
import './styles/resets.scss';
import './styles/base.scss';
import './styles/footer.scss';
import './styles/form.scss';
import './styles/header.scss';

// Wait for the DOM to be fully loaded before adding the event listener.
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('urlForm');
    form.addEventListener('submit', handleSubmit);
});

// Check if service workers are supported by the browser
if ('serviceWorker' in navigator) {
    // Register the service worker
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js');
    });
}