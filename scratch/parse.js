const https = require('https');

https.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=55757699', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    try {
      const obj = JSON.parse(data);
      console.log('Keys:', Object.keys(obj));
      console.log('authorName:', obj.authorName);
      console.log('authorBanner:', obj.authorBanner ? obj.authorBanner.substring(0, 100) : 'Not found');
      console.log('authorImage:', obj.authorImage ? obj.authorImage.substring(0, 100) : 'Not found');
    } catch (e) {
      console.error(e.message);
    }
  });
}).on('error', (err) => {
  console.error(err.message);
});
