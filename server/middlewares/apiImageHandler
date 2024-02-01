const axios = require("axios");
const fs = require("fs");
const cloudinary = require("../config/cloudinary");

const apiImageHandler = async (req, res, next) => {
    const url = req.body.url;
    const fileName = req.body.fileName;
    try{
        const response = await axios.get(url, {responseType: "arraybuffer"});
        const path = `../public/images/${fileName}`;
        fs.writeFileSync(path, response.data,(err)=>{
            if(err) throw err;
            console.log("The file has been saved");
            
            
        });
        const result = await cloudinary.uploader.upload(path);
        req.file = result;
        fs.unlinkSync(path);
        next();

    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
}

module.exports = apiImageHandler;