const path = require("path");
const uuid = require("uuid");

class FileService {
  moveFile(file) {
    const fileName = uuid.v4() + path.extname(file.name);
    file.mv(path.resolve(__dirname, "..", "static", fileName));
    return fileName;
  }
}

module.exports = new FileService();
