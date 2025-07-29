# NLP Article Analyzer

This project is a web application that allows users to analyze the sentiment of a news article or blog post by providing its URL. The application uses the Udacity-hosted Natural Language Processing (NLP) API to determine the sentiment of the article's text.

This project was built as part of the Udacity Front End Web Developer Nanodegree program.

### Key Features
-   Analyzes English-language articles from a given URL.
-   Displays the sentiment of the article (e.g., POSITIVE, NEUTRAL, NEGATIVE).
-   Client-side validation to ensure a valid URL is entered.
-   Uses a Node.js/Express back-end to handle API requests and web scraping securely.

---

### Technologies Used
-   HTML5
-   Sass (SCSS)
-   JavaScript (ES6+)
-   Node.js
-   Express.js
-   Webpack 5
-   Axios & Cheerio for server-side scraping
-   Jest (for testing)
-   Workbox (for Service Workers & offline functionality)

---

## Installation & Setup

### Prerequisites
-   Node.js and npm must be installed.
-   An internet connection.

### Steps
1.  Clone the repository to your local machine:
    ```bash
    git clone https://github.com/Loay-AlYahmadi/evaluate-news-nlp
    ```
2.  Navigate to the project directory:
    ```bash
    cd evaluate-news-nlp-main
    ```
3.  Install the project dependencies:
    ```bash
    npm install
    ```
4.  Create a file named `.env` in the project root and add the following line to it:
    ```
    API_ENDPOINT=https://kooye7u703.execute-api.us-east-1.amazonaws.com/NLPAnalyzer
    ```

---

## Running the Application

This project has scripts for both production and development environments.

### 1. Production Mode
This builds the optimized front-end assets and starts the Express server.

```bash
# First, build the assets
npm run build-prod

# Then, start the server
npm run start

The application will be running on http://localhost:8081.
2. Development Mode

This starts the Webpack Dev Server for live-reloading and easier debugging.
     
npm run build-dev

The development server will be running on http://localhost:8080.
3. Running Tests

To run the Jest unit tests, use the following command:

npm run test
