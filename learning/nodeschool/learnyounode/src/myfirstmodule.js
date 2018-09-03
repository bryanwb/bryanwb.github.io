const fs = require('fs');

exports.filterDir = function(dirname, extension, callback) {
  fs.readdir(dirname, (err, files) => {
    if (err) { callback(err); }
    return callback(null, files.filter((f) => f.endsWith('.' + extension)).join(', '));
  });
};
