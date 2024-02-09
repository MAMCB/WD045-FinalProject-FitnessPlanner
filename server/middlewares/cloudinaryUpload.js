const cloudinary = require("../config/cloudinary");
const fs = require("fs")

const cloudinaryUpload = async (req,res,next)=>{
  if(!req.file)
  {
    console.log('No file uploaded to cloudinary')
    return next();

  } 
    try {
        const filePath = req.file.path;
        const result = await cloudinary.uploader.upload(filePath);
        req.file = result;
        fs.unlinkSync(filePath);
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  // if (!this.getUpdate().image) {
  //   return next();
  // }
  //    try{
  //     const options = {
  //       public_id:this._id,
  //       folder:process.env.CLOUDINARY_EXERCISE_FOLDER_NAME,
  //     }
  //     console.log("IMAGEEEE",this.getUpdate().image)
  //     const imagePath = this.getUpdate().image;
  //     const res = await cloudinary.uploader.upload(imagePath, options);
  //     console.log('res.secure_url',res.secure_url)
  //     this.getUpdate().profilePic=res.secure_url;
  //     fs.unlinkSync(imagePath);
  //     next();
  //   }catch(e){
  //     console.log('error', e.message)
  //     next(e.message)
  //   }

}

module.exports = {cloudinaryUpload};