const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)

      const ext = path.extname(file.originalname);

      const fileName = file.fieldname + '-' + uniqueSuffix + ext;
      cb(null, fileName)
    }
  })

  function fileFilter (req, file, cb) {
if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)){
    return cb(new Error('Only image files are allowed'),false)
}
    cb(null, true)
  
  }
  //const upload = multer({ storage: storage, fileFilter:fileFilter })

  const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
      fileSize: 400 * 400, // size limit
      files: 5 // Limit number of files to 5
    }
  
  });
   console.log('upload.limits.fileSize', upload.limits.fileSize)
  module.exports=upload;