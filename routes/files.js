var express = require('express');
var router = express.Router();
var path = require('path')
let fs = require('fs')
let { uploadAFileWithField, uploadMultiFilesWithField } = require('../utils/uploadHandler')
const { Response } = require('../utils/responseHandler');
const { Authentication } = require('../utils/authHandler')

router.get('/:filename', function (req, res, next) {
    // Try images folder first (images are stored there), then files folder
    let filename = req.params.filename;
    let pathImage = path.join(__dirname, "../resources/images/", filename);
    let pathFile = path.join(__dirname, "../resources/files/", filename);
    if (fs.existsSync(pathImage)) {
        return res.status(200).sendFile(pathImage);
    }
    if (fs.existsSync(pathFile)) {
        return res.status(200).sendFile(pathFile);
    }
    Response(res, 404, false, "File not found");
})


// Single file upload (protected)
router.post("/uploads", Authentication, uploadAFileWithField('image'), function (req, res, next) {
    let URL = `${req.protocol}://${req.get('host')}/files/${req.file.filename}`
    Response(res, 200, true, URL)
})
// Multi file upload (protected)
router.post("/uploadMulti", Authentication, uploadMultiFilesWithField('image'), function (req, res, next) {
    let URLs = req.files.map(function(file){
        return `${req.protocol}://${req.get('host')}/files/${file.filename}`
    })
    Response(res, 200, true, URLs)
})

module.exports = router;