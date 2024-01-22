const fs = require('fs');
const path = require('path');
const fileName = './text.txt';
const filePath = path.join(__dirname, fileName);
const readStream = fs.createReadStream(filePath);
readStream.pipe(process.stdout);
