const axios = require("axios");
const fs = require("fs");
const cloudinary = require("../config/cloudinary");

const apiImageHandler = async (req, res, next) => {
    console.log(req.body);
  const url = req.body.image;
  const fileName = `${req.body.name}.gif`;
  try {
    const response = await axios.get(url, { responseType: "arraybuffer" });
    const path = `./public/images/${fileName}`;
    fs.writeFileSync(path, response.data, (err) => {
      if (err) {
        console.error("Error saving file:", err);
        throw err; // Rethrow the error to be caught in the catch block
      }
      console.log("The file has been saved");
    });
    const result = await cloudinary.uploader.upload(path);
    req.file = result;
    fs.unlinkSync(path);
    next();
  } catch (error) {
    console.error("Error in apiImageHandler:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = apiImageHandler;