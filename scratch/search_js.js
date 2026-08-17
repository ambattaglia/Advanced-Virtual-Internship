const fs = require('fs');
const path = require('path');

const jsPath = path.join(__dirname, 'main.js');
const js = fs.readFileSync(jsPath, 'utf8');

// Find index of "profile_banner"
const idx = js.indexOf('profile_banner');
if (idx !== -1) {
  console.log('Found profile_banner at index:', idx);
  // Print 500 characters before and after
  console.log('Context:', js.substring(idx - 250, idx + 250));
} else {
  console.log('profile_banner not found in main.js');
}

// Find any image files or static urls in static/media that could be the banner
const mediaRegex = /\/static\/media\/[^"']+/g;
const matches = js.match(mediaRegex) || [];
console.log('Media matches:', [...new Set(matches)]);
