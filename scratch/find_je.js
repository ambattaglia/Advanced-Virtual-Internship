const fs = require('fs');
const path = require('path');

const jsPath = path.join(__dirname, 'main.js');
const js = fs.readFileSync(jsPath, 'utf8');

// Find all declarations of je
// In minified code, it might be in a parameter or variable assignment.
// Let's find: je=n("...") or similar imports.
// We know "url(".concat(je,") top") is used.
// Let's look for: je = or ,je = or je=
const regexes = [
  /([a-zA-Z0-9_$]+)\s*=\s*([a-zA-Z0-9_$]+)\.p\s*\+\s*["']static\/media\/[a-zA-Z0-9._-]+["']/g,
  /je\s*=\s*["']([^"']+)["']/g,
  /je\s*=\s*([a-zA-Z0-9_$]+)/g
];

console.log('Looking for je definition...');
const match1 = js.match(/je\s*=\s*n\(\d+\)/g);
console.log('je matches n(number):', match1);

// Let's find the exact string assigning to je
const idx = js.indexOf('style:{background:"url(".concat(je,") top")}');
if (idx !== -1) {
  // Let's look at the function scope where this is defined
  const scope = js.substring(idx - 1000, idx);
  console.log('Scope context:', scope);
}
