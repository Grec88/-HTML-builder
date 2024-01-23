const fs = require('fs');
const readline = require('readline');
const inputStream = fs.createWriteStream('02-write-file/text.txt');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
console.log(
  'Please, enter some text.\nPress enter to save the input info to the file\nInput some more text or close the process typing exit or pressing ctrl + c.',
);
rl.on('line', (input) => {
  if (input === 'exit') {
    rl.close();
    inputStream.end();
  } else {
    inputStream.write(input + '\n');
    console.log(
      'The text has been saved to the file.\nInput some more text or close the process typing exit or pressing ctrl + c.',
    );
  }
});

rl.on('close', () => {
  console.log('Goodbye!');
});

process.on('SIGINT', () => {
  rl.close();
});
