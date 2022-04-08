const im = require('imagemagick');
const crypto = require('crypto');
const config = require('../config');

const DEFAULT_IMAGE_SIZE = 256;

function resizeImage({
  sourcePath,
  destinationPath,
  width = DEFAULT_IMAGE_SIZE,
  height = DEFAULT_IMAGE_SIZE,
  callback = () => null,
}) {
  im.resize(
    {
      srcPath: sourcePath,
      dstPath: destinationPath,
      width,
      height,
    },
    function (err, stdout, stderr) {
      if (!err) {
        console.log(
          `Image from ${sourcePath} has been resized in ${destinationPath} to a size of ${width}x${height}`
        );
      }
      return callback(err);
    }
  );
}

function storeImage({ imageFile }) {
  const sourcePath = imageFile.tempFilePath;
  const imageName = crypto.randomBytes(5).toString('hex');
  const [fileExtension] = imageFile.name.split('.').slice(-1);
  const storagePath = config.storagePathBase + `${imageName}.${fileExtension}`;
  return new Promise((resolve, reject) => {
    resizeImage({
      sourcePath,
      destinationPath: storagePath,
      callback: (err) => {
        if (err) {
          return reject(err);
        }

        const url = `http://${config.hostname}:${config.port}/${imageName}.${fileExtension}`;
        return resolve({
          url,
          width: DEFAULT_IMAGE_SIZE,
          height: DEFAULT_IMAGE_SIZE,
        });
      },
    });
  });
}

module.exports = {
  resizeImage,
  storeImage,
};
