const path = require('path');
const { promises } = require('fs');
const projectFolderPath = path.join(__dirname, './project-dist');
const stylesFolderPath = path.join(__dirname, './styles');
const outputFileName = 'style.css';
const templateFilePath = '06-build-page/template.html';
const componentsFolderPath = '06-build-page/components';
const assetsFolderPath = '06-build-page/assets';
let templateRes;
promises
  .mkdir(projectFolderPath, { recursive: true })
  .then(() => {
    return promises.readFile(templateFilePath, 'utf8');
  })
  .then((template) => {
    let proms = [];
    const tagNames = template.match(/{{\w+}}/g);
    for (const tagName of tagNames) {
      const componentFileName = tagName.replace(/{{|}}/g, '');
      const componentFilePath = path.join(
        componentsFolderPath,
        componentFileName + '.html',
      );
      proms.push(
        promises
          .readFile(componentFilePath, 'utf8')
          .then((componentContent) => {
            template = template.replace(tagName, componentContent);
            templateRes = template;
          }),
      );
    }
    return Promise.all(proms);
  })
  .then(() => {
    return promises.writeFile(
      path.join(projectFolderPath, 'index.html'),
      templateRes,
    );
  })
  .then(() => {
    const mergeStyles = require('../05-merge-styles');
    return mergeStyles(stylesFolderPath, projectFolderPath, outputFileName);
  })
  .then(() => {
    const copyDirectory = require('../04-copy-directory');
    return copyDirectory(assetsFolderPath, projectFolderPath + '/assets');
  })
  .then(() => {
    console.log('The project folder has been created successfully.');
  })
  .catch((err) => {
    console.error(err);
  });
