import { readFile } from 'fs';

setTimeout(function () {
  console.log('Timer1 Expired');
}, 0);

setImmediate(function () {
  console.log('Immediate Expired');
});

readFile('./test-file.txt', 'utf-8', (e, d) => {
  console.log('File Reading Success');
  console.log('-----------------------------------------');

  setTimeout(function () {
    console.log('Timer2 Expired');
  }, 0);

  setTimeout(function () {
    console.log('Timer3 Expired');
  }, 3000);

  setImmediate(function () {
    console.log('Immediate2 Expired');
  });

  process.nextTick(() => console.log('Process.nextTick'));
});

console.log('Hello, its top level code');
