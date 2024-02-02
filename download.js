const https = require('https');
const fs = require('fs');

const imageUrl = 'https://file-1253403808.cos.ap-beijing.myqcloud.com/woa-test-bj.jpg';
const imageName = 'image-bj.jpg';

// const imageUrl = 'https://test-1253403808.cos.ap-guangzhou.myqcloud.com/woa-test-gz.jpg'
// const imageName = 'image-gz.jpg';

const file = fs.createWriteStream(imageName);
console.time('bj_download')
https.get(imageUrl, response => {
  response.pipe(file);

  file.on('finish', () => {
    file.close();
    console.timeEnd('bj_download')
  });
}).on('error', err => {
  fs.unlink(imageName);
  console.error(`Error downloading image: ${err.message}`);
});