const express = require('express');
const multer = require('multer');
const path = require("path");
const router = express.Router();

router.use('/uploads', express.static(path.join(__dirname + '/uploads')));

let storageA = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    const allowedTypes = /mp4|png|jpg|jpeg|webp|tiff|mkv|ts|avi|mov/;
    const isValid = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    if (isValid) {
      cb(null, true);
    } else {
      cb(new Error('File Format Not Allowed! Use MP4 If You Are Uploading A Video'), false);
    }
  };
  

module.exports = {
    uploads: multer({storage:storageA, fileFilter:fileFilter}),
};