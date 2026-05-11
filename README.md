# SummaryAI Landing Page

SummaryAI is a responsive multi-page website concept for an AI-powered document summarization product.
It presents the product value, key features, upload flow concept, team information, and contact channels.

## Project Overview

This project includes:

- A marketing home page with hero, feature highlights, workflow steps, and call-to-action sections.
- An about page with mission, audience, and project context.
- A contact page with a form and social links.
- Shared and page-specific styling for a consistent visual identity.

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript

## Pages

- `index.html` - Main landing page
- `about.html` - About the project and team
- `contact.html` - Contact form and social profiles

## Project Structure

```text
.
|-- index.html
|-- about.html
|-- contact.html
|-- css/
|   |-- styles.css
|   |-- about.css
|   `-- contact.css
|-- js/
|   `-- scripts.js
`-- assets/
```

## Gemini API Configuration

This project depends on the **Google Gemini API** for document summarization functionality. To use the summarization features:

1. **Obtain an API Key**: Visit [Google AI Studio](https://aistudio.google.com/app/apikey) to create a free API key.
2. **Configure the API Key**: Open `js/scripts.js` and locate the `GEMINI_API_KEY` constant (around line 58). Replace the placeholder value with your actual API key:
   ```javascript
   const GEMINI_API_KEY = "your-actual-api-key-here";
   ```
3. **Without the API Key**: The summarization features will not work. Users will see errors when attempting to upload and summarize documents.

## Getting Started

1. Clone or download this repository.
2. **Configure the Gemini API key** (see [Gemini API Configuration](#gemini-api-configuration) section above).
3. Open the project folder in VS Code.
4. Run `index.html` with Live Server (or open it directly in your browser).

## Contest Context

This project was created as part of the Full Stack Club contest (April 2026), under the monthly theme "AI for Devs".

## Authors

- Leticia Alves
- Erik Miqueias
