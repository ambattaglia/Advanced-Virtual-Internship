const fs = require('fs');
const path = require('path');

const jsPath = path.join(__dirname, 'main.js');
const js = fs.readFileSync(jsPath, 'utf8');

// Search for data-aos or aos in the JS bundle
const regex = /"data-aos":"([^"]+)"/gi;
const matches = [];
let match;
while ((match = regex.exec(js)) !== null) {
  matches.push(match[0]);
}

console.log('Found AOS data attributes:', [...new Set(matches)]);

// Search for AOS.init or similar
const initMatch = js.match(/AOS\.init\([^)]*\)/gi);
console.log('AOS init matches:', initMatch);

// Let's print out some occurrences of data-aos in context
let idx = 0;
while ((idx = js.indexOf('data-aos', idx)) !== -1) {
  console.log('AOS context:', js.substring(idx - 150, idx + 150));
  idx += 8; // skip past "data-aos"
}
