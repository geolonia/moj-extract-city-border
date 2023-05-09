const fs = require('fs');
const path = require('path');
const unzipper = require('unzipper');

const directoryPath = process.argv[2];

const unzip = (directoryPath) => {

  fs.readdir(directoryPath, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      const filePath = path.join(directoryPath, file);

      if (path.extname(file) === '.zip') {
        
        console.log(`Unzipping ${file}`);

        fs.createReadStream(filePath)
          .pipe(unzipper.Parse())
          .on('entry', function (entry) {
            if (path.extname(entry.path) === '.xml') {
              const targetPath = path.join(directoryPath, path.basename(entry.path));
              entry.pipe(fs.createWriteStream(targetPath));

            } else {
              entry.autodrain();
            }
          });
      }
    }
  });

}

unzip(directoryPath);