const multer = require("multer"); 
const storage = multer.memoryStorage({
    destination: function(req, file, callback){
        callback(null, "")
    }
})

const upload = multer({storage}).single("image"); 

const AWS = require('aws-sdk'); 
const S3 = new AWS({
    accessKeyId:
    secretAccessKey:
})