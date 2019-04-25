const http = require('http');
const fs = require('fs');
export default function downloadFile(url, path, isBase64 = false) {
  if (!isBase64) {
    // 网络资源保存
    http.get(url, res => {
      res.setEncoding('binary');
      let fileData = '';
      res.on('data', chunk => {
        fileData += chunk;
      });
      res.on('end', () => {
        fs.writeFile(path, fileData, 'binary', err => {
          if (err) {
            console.error(err);
          }
        });
      });
    });
  } else {
    // 保存base64图片
    let imgData = url;
    // 过滤data:URL
    let base64Data = imgData.replace(/^data:image\/\w+;base64,/, '');
    let dataBuffer = Buffer.from(base64Data, 'base64');
    fs.writeFile(path, dataBuffer, err => {
      if (err) {
        console.error(err);
      }
    });
  }
}


