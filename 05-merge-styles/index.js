const fs = require('fs');
const path = require('path');
const { promises } = require('fs');
const stylesFolderPath = '05-merge-styles/styles';
const projectFolderPath = '05-merge-styles/project-dist';
const outputFileName = 'bundle.css';
const styles = [];
promises
  .readdir(stylesFolderPath, { withFileTypes: true })
  .then((dirents) => {
    for (const dirent of dirents) {
      if (dirent.isFile() && path.extname(dirent.name) === '.css') {
        const styleFilePath = path.join(stylesFolderPath, dirent.name);
        const styleContent = fs.readFileSync(styleFilePath, 'utf8');
        styles.push(styleContent);
      }
    }
    const bundle = styles.join('\n');
    return promises.writeFile(
      path.join(projectFolderPath, outputFileName),
      bundle,
    );
  })
  .then(() => {
    console.log('The styles folder has been merged successfully.');
  })
  .catch((err) => {
    console.error(err);
  });
