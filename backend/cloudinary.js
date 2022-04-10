const cloudinary = require('cloudinary');
const config = require('./utils/config');

cloudinary.config(config.CLOUDINARY_CONFIG);

exports.uploads = (file, folder) => {
  return new Promise(resolve => {
    cloudinary.uploader.upload(file, (result) => {
      resolve({
        url: result.url,
        id: result.public_id
      })
    }, {
      resource_type: 'auto',
      folder: folder
    })
  })
}
