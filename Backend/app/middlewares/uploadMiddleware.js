const multer = require('multer');

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, 'public/upload/');
        },
        filename: function (req, file, callback) {
            callback(null, file.originalname);
        }
    })
});

module.exports = upload