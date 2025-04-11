import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});


const fileFilter = (req, file, cb) => {
    cb(null, true);
};

const fileupload = multer({ storage, fileFilter });

export { fileupload };
