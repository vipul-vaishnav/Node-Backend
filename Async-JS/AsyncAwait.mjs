import { readFile, writeFile } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import superagent from 'superagent';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, 'dog.txt');
const dog_img_file_path = path.join(__dirname, 'dog-img-async-await.txt');

// ASYNC AWAIT EXAMPLE

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

const getDogPic = async () => {
  try {
    const data = await readFilePro(filePath);
    console.log('Breed:-', data);

    // multiple promise handling
    const res0 = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    const res1 = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    const res2 = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    const res3 = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);

    const all = await Promise.all([res0, res1, res2, res3]);
    const msgArr = all.map((el) => el.body.message);
    console.log(msgArr);

    console.log('IMAGES:- ');
    console.log(msgArr.join(',\n'));

    await writeFilePro(dog_img_file_path, msgArr.join('\n'));
    console.log('Random Dog image saved to file');
  } catch (error) {
    console.log(error.message);
  }

  return 'This is going to get returned';
};

// IIFE (immediately invoked function expression)

(async () => {
  try {
    const data = await getDogPic();
    console.log(data);
  } catch (error) {
    console.log(error.message);
  }
})();

// ==========Promises example=========

// READFILE
// const readFilePro = (file) => {
//   return new Promise((resolve, reject) => {
//     readFile(file, 'utf-8', (err, data) => {
//       if (err) reject('Something went wrong');
//       resolve(data);
//     });
//   });
// };

// // WRITEFILE
// const writeFilePro = (file, data = 'File Written') => {
//   return new Promise((resolve, reject) => {
//     writeFile(file, data, (err) => {
//       if (err) reject('Something went wrong');
//       resolve('File Written successfully');
//     });
//   });
// };

// readFilePro(filePath)
//   .then((data) => {
//     console.log('Breed:-', data);
//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//   })
//   .then((res) => {
//     return writeFilePro(dog_img_file_path, res.body.message);
//   })
//   .then((res) => {
//     if (res) {
//       console.log('File written successfully');
//     }
//   })
//   .catch((err) => {
//     console.log(err.message);
//   })
//   .finally(() => {
//     console.log('Code completed successfully');
//   });

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

// ==========callback hell example=========

// readFile(filePath, 'utf-8', (err, data) => {
//   if (err) {
//     console.log('ERROR: File not found');
//     return;
//   }

//   superagent.get(`https://dog.ceo/api/breed/${data}/images/random`).end((err, data) => {
//     if (err) {
//       console.log('ERROR: 💥💥💥');
//       return;
//     }
//     const img_url = data.body.message;

//     writeFile(dog_img_file_path, img_url, (err) => {
//       if (err) {
//         console.log('Something went wrong');
//         return;
//       }

//       console.log('File saved successfully');
//     });
//   });
// });
