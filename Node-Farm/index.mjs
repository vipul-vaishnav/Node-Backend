import { createServer } from 'http';
import { readFileSync } from 'fs';
import path from 'path';
import url, { fileURLToPath } from 'url';
import replaceTemplate from './modules/replaceTemplate.mjs';

//The 'fileURLToPath' method returns the fully-resolved platform-specific Node.js file path.
const __filename = fileURLToPath(import.meta.url);

// use the 'dirname()' method from the 'path' module. The 'dirname' method takes a path as a parameter and returns the directory name of the 'path'.
const __dirname = path.dirname(__filename);

// Paths for different files
const overviewPath = path.join(__dirname, 'templates', 'template-overview.html');
const productPath = path.join(__dirname, 'templates', 'template-product.html');
const cardPath = path.join(__dirname, 'templates', 'template-card.html');
const dataPath = path.join(__dirname, 'data', 'data.json');

// Reading files synchronously
const readFileFunc = (path) => {
  return readFileSync(`${path}`, 'utf-8');
};

// Data from different files
const tempOverview = readFileFunc(overviewPath);
const tempProduct = readFileFunc(productPath);
const tempCard = readFileFunc(cardPath);

const data = readFileFunc(dataPath);
const dataObj = JSON.parse(data);

const server = createServer((req, res) => {
  const { pathname, query } = url.parse(req.url, true);

  //   OVERVIEW
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, 'OK', { 'Content-Type': 'text/html' });

    // Creating content for replacement of 'product_cards' template
    const cards_html = dataObj.map((el) => replaceTemplate(tempCard, el)).join('');

    // Replacing 'product_cards' template with the cards_html
    const output = tempOverview.replace(/{%PRODUCT_CARDS%}/g, cards_html);

    res.end(output);

    // PRODUCTS
  } else if (pathname === '/product') {
    res.writeHead(200, 'OK', { 'Content-Type': 'text/html' });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);

    // API
  } else if (pathname === '/api') {
    res.writeHead(200, 'OK', { 'Content-Type': 'application/json' });
    res.end(data);

    // NOT FOUND
  } else {
    res.writeHead(404, 'Page Not Found', {
      'Content-type': 'text/html',
    });
    res.end('<h1 style="text-align:center">ERROR: 404, Not Found</h1>');
  }
});

server.listen(5050, '127.0.0.1', () => {
  console.log('Server listening on port 5050...');
});
