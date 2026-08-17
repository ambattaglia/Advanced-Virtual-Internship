const https = require('https');

https.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=83937449', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const obj = JSON.parse(data);
    console.log('Monica Lucas keys:', Object.keys(obj));
    console.log('nftCollection exists:', Array.isArray(obj.nftCollection));
  });
}).on('error', (err) => {
  console.error(err);
});
