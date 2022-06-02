const {uuid} = require('uuidv4')
const path = require("path");
const multer = require("multer");

 let diskStorage = multer.diskStorage({
  // Định nghĩa nơi file upload sẽ được lưu lại
  destination: (req, file, callback) => {
    callback(null, path.join(`${__dirname}/../../uploads`));
  },
  filename: (req, file, callback) => {
    // ở đây các bạn có thể làm bất kỳ điều gì với cái file nhé.
    // Mình ví dụ chỉ cho phép tải lên các loại ảnh png & jpg
    let math = ["image/png", "image/jpeg"];
    let ex = file.mimetype.split('/')[1];
    if (math.indexOf(file.mimetype) === -1) {
      let errorMess = "file ảnh gửi lên không đúng định dạng";
      return callback(errorMess, null);
    }
    // Tên của file thì mình nối thêm một cái nhãn thời gian để tránh bị trùng tên file.
    let filename = `${Date.now()}-m4u-${uuid()}.${ex}`;
    callback(null, filename);
  }
});

let uploadFile = multer({storage: diskStorage}).single("file");

 module.exports = uploadFile;