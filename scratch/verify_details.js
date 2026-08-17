const https = require('https');

https.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=52582949', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const obj = JSON.parse(data);
    console.log('Full response keys:', Object.keys(obj));
    console.log('Full response data fields:');
    for (const key of Object.keys(obj)) {
      if (typeof obj[key] === 'string' && obj[key].length > 100) {
        console.log(`  ${key}: string(length: ${obj[key].length})`);
      } else {
        console.log(`  ${key}:`, obj[key]);
      }
    }
  });
}).on('error', (err) => {
  console.error(err);
});
