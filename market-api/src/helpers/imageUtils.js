const im = require('imagemagick');

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

module.exports = {
  resizeImage,
};
