const path = require('path');
const { promises } = require('fs');
const sourceFolder = path.join(__dirname, './files');
const destinationFolder = path.join(__dirname, './files-copy');
async function copyDir(source, destination) {
  await promises.mkdir(destination, { recursive: true });
  const files = await promises.readdir(source);
  for (const file of files) {
    const sourceFilePath = path.join(source, file);
    const destinationFilePath = path.join(destination, file);
    const stats = await promises.stat(sourceFilePath);
    if (stats.isDirectory()) {
      await copyDir(sourceFilePath, destinationFilePath);
    } else {
      await promises.copyFile(sourceFilePath, destinationFilePath);
    }
  }
}
copyDir(sourceFolder, destinationFolder)
  .then(() => {
    console.log('The files folder has been copied successfully.');
  })
  .catch((err) => {
    console.error(err);
  });

module.exports = copyDir;
