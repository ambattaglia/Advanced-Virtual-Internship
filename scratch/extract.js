const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'main.css');
const css = fs.readFileSync(cssPath, 'utf8');

// Find occurrences of profile_banner in the CSS
const regex = /#profile_banner\s*\{([^}]+)\}/gi;
let match;
while ((match = regex.exec(css)) !== null) {
  console.log('Match:', match[0]);
}

// Also search for any url(...) containing author or banner
const urlRegex = /url\(([^)]+)\)/gi;
let urlMatch;
const urls = [];
while ((urlMatch = urlRegex.exec(css)) !== null) {
  const url = urlMatch[1].replace(/['"]/g, '');
  if (url.includes('banner') || url.includes('author') || url.includes('bg')) {
    urls.push(url);
  }
}
console.log('Found URLs:', [...new Set(urls)]);
