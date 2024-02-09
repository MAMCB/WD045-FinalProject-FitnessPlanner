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
  const upload = multer({ storage: storage, fileFilter:fileFilter })

 const uploadFileIfPresent = (req, res, next) => {
  console.log(req)
   // Check if there is a file in the request
   if (req.file) {
     // If there is a file, upload it using multer
     multer({ storage: storage, fileFilter: fileFilter }).single("image")(
       req,
       res,
       next
     );
   } else {
    console.log('No file uploaded through multer')
     // If there is no file, move to the next middleware
     next();
   }
 };

  module.exports={upload,uploadFileIfPresent};