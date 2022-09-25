// const path = require('path');

const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinaryUpload = require('./cloudinary');
// const {SIZE_IMG_LIMIT} = process.env;
// const filesize = Number(SIZE_IMG_LIMIT);


// const storage = multer.diskStorage({
//     destination: (req, file, cb)=>{
//         cb(null, path.join(global.__basepath, 'assets', 'upload'));
//     },
//     filename: (req, file, cb)=>{
//         const timestamp = new Date().getTime();
//         const ext = file.mimetype.split('/')[1];
//         cb(null, `${timestamp}.${ext}`);
//     }
// });

const storage = new CloudinaryStorage({
    cloudinary: cloudinaryUpload,
    params: {
        folder: 'upload_picture_myewallet',
        format: async (req, file) => 'png',
        public_id: (req, file) => new Date().getTime()
    }
});

const upload = multer({
    storage,
    limits: {
        fileSize: 1 * 1024 * 1024
    },
    fileFilter: (req, file, cb)=>{
        const allowExt = ['image/png','image/jpeg','image/webp'];
        if(allowExt.includes(file.mimetype)){
            cb(null, true);
        }else{
            const err = new Error('Extension not supported');
            cb(err, false);
        }
        
    }
});

module.exports = upload;