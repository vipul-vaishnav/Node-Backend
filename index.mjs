import { createServer } from 'http';
import { readFile, readFileSync } from 'fs';

///////////==SERVER==////////////

const data = readFileSync('./1-node-farm/starter/dev-data/data.json', 'utf-8');
const dataObj = JSON.parse(data);

const server = createServer((req, res) => {
  const pathName = req.url;

  if (pathName === '/' || pathName === '/overview') {
    res.end('This is the overview');
  } else if (pathName === '/product') {
    res.writeHead(200, 'OK', { 'Content-Type': 'text/html' });
    res.end('<h1 style="text-align:center">This is the product page</h1>');
  } else if (pathName === '/api') {
    res.writeHead(200, 'OK', { 'Content-Type': 'application/json' });
    res.end(data);
  } else {
    res.writeHead(404, 'Page Not Found', {
      'Content-type': 'text/html',
    });
    res.end('<h1 style="text-align:center">ERROR: 404, Not Found</h1>');
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Server listening on port 8000...');
});

// ***********************************************************************************************

// import { readFile, writeFile } from 'fs';

// const myData = new Date(Date.now()).toLocaleString();

// // *******THIS IS ASYNCHRONOUS _ NON-BLOCKING CODE*********

// readFile('./1-node-farm/starter/txt/start.txt', 'utf-8', (err, data1) => {
//   if (err) {
//     console.log('ERROR: File not found 💥💥💥');
//     return;
//   }

//   console.log(data1);
//   readFile(`./1-node-farm/starter/txt/${data1}.txt`, 'utf-8', (err, data2) => {
//     if (err) {
//       console.log('ERROR: File not found 💥💥💥');
//       return;
//     }

//     console.log(data2);
//     readFile('./1-node-farm/starter/txt/append.txt', 'utf-8', (err, data3) => {
//       if (err) {
//         console.log('ERROR: File not found 💥💥💥');
//         return;
//       }

//       console.log(data3);
//       writeFile(
//         './1-node-farm/starter/txt/final.txt',
//         `${data2 + '\n\n' + data3 + '\n\n' + 'Created at:' + ' ' + myData}`,
//         'utf-8',
//         (err) => {
//           if (err) {
//             console.log('ERROR: File not found 💥💥💥');
//             return;
//           }

//           console.log('File is getting written...');
//         }
//       );
//     });
//   });
// });

// console.log('Reading File....');

// ***********************************************************************************************

// const callback = (err, data) => {
//   console.log(data);
// };

// readFile('./1-node-farm/starter/txt/start.txt', 'utf-8', callback); // This is non-blocking

// console.log('Reading File...');

// *******THIS IS SYNCHRONOUS _ BLOCKING CODE*********

// import { readFileSync, writeFileSync } from 'fs';

// const textIn = readFileSync('./1-node-farm/starter/txt/input.txt', 'utf-8');

// console.log(textIn);

// const textOut = `This is what we know about the avacado: ${textIn}.\nCreated on ${myData}`;

// writeFileSync('./1-node-farm/starter/txt/output.txt', textOut);

// console.log(textOut);
