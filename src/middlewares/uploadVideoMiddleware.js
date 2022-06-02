const {uuid} = require('uuidv4')
const path = require("path");
const multer = require("multer");



 let diskStorage = multer.diskStorage({
  // Định nghĩa nơi file upload sẽ được lưu lại
  destination: (req, file, callback) => {
    callback(null, path.join(`${__dirname}/../../uploads`));
  },
  filename: (req, file, callback) => {
    
    let math = ["video/mp4",'video/ogg','video/wmv','video/x-flv','video/avi','video/mkv','video/mov'];
    let ex = file.mimetype.split('/')[1];
    if (math.indexOf(file.mimetype) === -1) {
      let errorMess = "file video gửi lên không đúng định dạng";
      return callback(errorMess, null);
    }
    // Tên của file thì mình nối thêm một cái nhãn thời gian để tránh bị trùng tên file.
    let filename = `${Date.now()}-m4u-${uuid()}.${ex}`;
    callback(null, filename);
  }
});



let uploadVideo = multer({storage: diskStorage}).single("video");

 module.exports = uploadVideo;