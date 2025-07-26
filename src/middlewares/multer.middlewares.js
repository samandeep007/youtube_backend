import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => { //cb is callback here, remember the params: req, file, cb
        cb(null, './public/temp') //error is null here: we are not handling the error
    },

    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

export default upload;