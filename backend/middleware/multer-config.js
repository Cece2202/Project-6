const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};
// imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images'); // Ensure that this folder exists in your project root
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});

module.exports = multer({ storage: storage }).single('image');