const fs = require("fs");

const loggerMessage = (msg) => {
  fs.appendFile("logger.txt", msg + "\n", function (err) {
    if (err) throw err;
    console.log("Message from logger: " + msg);
  });
};
//default export
module.exports = loggerMessage;
//named export
module.exports.config = {};
