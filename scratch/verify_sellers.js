const https = require('https');

https.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const list = JSON.parse(data);
    console.log('List length:', list.length);
    if (list.length > 0) {
      console.log('Keys of first item:', Object.keys(list[0]));
      console.log('First item:', list[0]);
    }
  });
}).on('error', (err) => {
  console.error(err);
});
