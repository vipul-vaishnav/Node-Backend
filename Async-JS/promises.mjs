import { readFile, writeFile } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import superagent from 'superagent';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, 'dog.txt');
const dog_img_file_path = path.join(__dirname, 'dog-img-promises.txt');

// ==========Promises example=========

// READFILE
const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    readFile(file, 'utf-8', (err, data) => {
      if (err) reject('Something went wrong');
      resolve(data);
    });
  });
};

// WRITEFILE
const writeFilePro = (file, data = 'File Written') => {
  return new Promise((resolve, reject) => {
    writeFile(file, data, (err) => {
      if (err) reject('Something went wrong');
      resolve('File Written successfully');
    });
  });
};

readFilePro(filePath)
  .then((data) => {
    console.log('Breed:-', data);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((res) => {
    return writeFilePro(dog_img_file_path, res.body.message);
  })
  .then((res) => {
    if (res) {
      console.log('File written successfully');
    }
  })
  .catch((err) => {
    console.log(err.message);
  })
  .finally(() => {
    console.log('Code completed successfully');
  });

// readFile(filePath, 'utf-8', (err, data) => {
//   if (err) {
//     console.log('ERROR: File not found');
//     return;
//   }

//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .then((response) => {
//       const img_url = response.body.message;
//       writeFile(dog_img_file_path, img_url, (err) => {
//         if (err) {
//           console.log('Something went wrong');
//           return;
//         }
//         console.log('File saved successfully');
//       });
//     })
//     .catch((error) => {
//       console.log('ERROR: 💥💥💥', error.message);
//       return;
//     });
// });
