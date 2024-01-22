const path = require('path');
const { promises } = require('fs');
const secretFolderPath = '03-files-in-folder/secret-folder';
promises
  .readdir(secretFolderPath, { withFileTypes: true })
  .then((dirents) => {
    for (const dirent of dirents) {
      if (dirent.isFile()) {
        const fileName = dirent.name;
        const fileExtension = path.extname(fileName);
        const filePath = path.join(secretFolderPath, fileName);
        promises
          .stat(filePath)
          .then((stats) => {
            const fileSize = stats.size;
            console.log(`${fileName}-${fileExtension}-${fileSize} bytes`);
          })
          .catch((err) => {
            console.error(err);
          });
      }
    }
  })
  .catch((err) => {
    console.error(err);
  });
