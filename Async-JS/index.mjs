import { readFile, writeFile } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import superagent from 'superagent';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, 'dog.txt');
const dog_img_file_path = path.join(__dirname, 'dog-img.txt');

// ==========callback hell example=========

readFile(filePath, 'utf-8', (err, data) => {
  if (err) {
    console.log('ERROR: File not found');
    return;
  }

  superagent.get(`https://dog.ceo/api/breed/${data}/images/random`).end((err, data) => {
    if (err) {
      console.log('ERROR: 💥💥💥');
      return;
    }
    const img_url = data.body.message;

    writeFile(dog_img_file_path, img_url, (err) => {
      if (err) {
        console.log('Something went wrong');
        return;
      }

      console.log('File saved successfully');
    });
  });
});
