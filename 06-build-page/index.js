const fs = require('fs');
const path = require('path');
const { promises } = require('fs');
const projectFolderPath = path.join(__dirname, './project-dist');
const outputFileName = 'style.css';
const templateFilePath = '06-build-page/template.html';
const componentsFolderPath = '06-build-page/components';
const stylesFolderPath = path.join(__dirname, './styles');
const assetsFolderPath = '06-build-page/assets';
promises
  .mkdir(projectFolderPath, { recursive: true })
  .then(() => {
    return promises.readFile(templateFilePath, 'utf8');
  })
  .then((template) => {
    const tagNames = template.match(/{{\w+}}/g);
    for (const tagName of tagNames) {
      const componentFileName = tagName.replace(/{{|}}/g, '');
      const componentFilePath = path.join(
        componentsFolderPath,
        componentFileName + '.html',
      );
      const componentContent = fs.readFileSync(componentFilePath, 'utf8');
      template = template.replace(tagName, componentContent);
    }
    return promises.writeFile(
      path.join(projectFolderPath, 'index.html'),
      template,
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
