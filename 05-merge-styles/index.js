const path = require('path');
const { promises } = require('fs');
const outputFile = 'bundle.css';
const projectPath = path.join(__dirname, './project-dist');
const stylesPath = path.join(__dirname, './styles');
const styles = [];
const mergeStyles = (stylesFolderPath, projectFolderPath, outputFileName) => {
  promises
    .readdir(stylesFolderPath, { withFileTypes: true })
    .then((dirents) => {
      let proms = [];
      for (const dirent of dirents) {
        if (dirent.isFile() && path.extname(dirent.name) === '.css') {
          const styleFilePath = path.join(stylesFolderPath, dirent.name);
          proms.push(
            promises.readFile(styleFilePath, 'utf8').then((styleContent) => {
              styles.push(styleContent);
            }),
          );
        }
      }
      return Promise.all(proms);
    })
    .then(() => {
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
};

mergeStyles(stylesPath, projectPath, outputFile);

module.exports = mergeStyles;
