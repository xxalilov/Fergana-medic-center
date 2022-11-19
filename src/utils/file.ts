import {unlink} from 'fs';
import multer, {diskStorage} from 'multer';

const fileStorage = diskStorage({
    destination: (req, file, cb) => {
        cb(null, './static/uploads/');
    },
    filename: (req, file, cb) => {
        cb(
            null,
            new Date().getTime().toString() +
            '-' +
            file.originalname.replace(/\s/g, ''),
        );
    },
});

const fileFilter = (req: any, file: any, cb: any) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/svg+xml' ||
        file.mimetype === 'image/webp'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const deleteFile = (filePath: any) => {
    unlink(filePath, (err) => {
        if (!err) {
            return console.log('Deleted File');
        }
        console.log("File didn't delete");
    });
};

const upload = multer({storage: fileStorage, fileFilter: fileFilter});

export {upload, deleteFile};
