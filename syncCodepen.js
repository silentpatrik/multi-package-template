const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

// Function to validate a codepen URL
function validateUrl(url) {
    const pattern = /^https:\/\/codepen\.io\/[^\/]+\/pen\/[^\/]+$/;
    return pattern.test(url);
}

// Function to fetch the embedded content
async function fetchContent(url) {
    try {
        const response = await fetch(url.replace('/pen/', '/embed/'));
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.text();
    } catch (error) {
        console.error('Failed to fetch content:', error);
    }
}

// Function to extract contents from the fetched page
function extractContents(htmlContent) {
    const match = htmlContent.match(/<script nonce="[^"]*">__processedPen = (.*?);<\/script>/);
    if (match && match[1]) {
        return JSON.parse(match[1]);
    } else {
        throw new Error('Failed to extract contents');
    }
}

// Function to write files
function writeFiles(contents, dirName) {
    const dirPath = path.join(process.cwd(), dirName);
    fs.mkdirSync(dirPath);

    fs.writeFileSync(path.join(dirPath, 'index.html'), contents.html);
    fs.writeFileSync(path.join(dirPath, 'app.css'), contents.css);
    fs.writeFileSync(path.join(dirPath, 'app.js'), contents.js);
}

// Main function to orchestrate the tasks
async function main(url) {
    if (!validateUrl(url)) {
        console.error('Invalid URL. Please ensure the URL follows the pattern https://codepen.io/<username>/pen/<pen_id>');
        return;
    }

    const content = await fetchContent(url);
    const extractedContents = extractContents(content);
    const timestamp = Date.now();
    writeFiles(extractedContents, `codepen_${timestamp}`);
}

// Entry point
const url = process.argv[2];
if (!url) {
    console.log('Please enter the CodePen URL:');
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });
    readline.question('URL: ', (inputUrl) => {
        readline.close();
        main(inputUrl.trim());
    });
} else {
    main(url);
}
