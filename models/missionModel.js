// const fs = require('fs');
// const path = require('path');
// const filePath = path.join(__dirname, '../mission.json');

// // Function to get all missions
// function getMissions() {
//   return new Promise((resolve, reject) => {
//     fs.readFile(filePath, 'utf8', (err, data) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(JSON.parse(data));
//       }
//     });
//   });
// }

// // Function to save mission results
// function saveMissions(missions) {
//   return new Promise((resolve, reject) => {
//     fs.writeFile(filePath, JSON.stringify(missions, null, 2), 'utf8', err => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve();
//       }
//     });
//   });
// }

// module.exports = {
//   getMissions,
//   saveMissions
// };
