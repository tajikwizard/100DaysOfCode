//File System
const fs = require("fs");
const path = require("path");
const logger = require("./logger");

//Writing to file
fs.writeFile("data.txt", "Hello There", (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("File written successfully");
  }
});

// Reading from file
fs.readFile("data.txt", "utf-8", (err, data) => {
  if (err) {
    console.log(err);
    return;
  } else {
    console.log("File read successfully: " + data);
  }
});

//Delining File
fs.unlink("data.txt", (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("File deleted successfully");
  }
});

//current full path directory
const currentFullPath = path.join(__dirname);
console.log(currentFullPath);
//creating custom path
const customPath = path.join("Documents", "images", "img.png");
console.log(customPath);
//join with current path
const imgFullPath = path.join(__dirname, customPath);
console.log(imgFullPath);
//file name last segmanet of path
const baseName = path.basename(imgFullPath);
console.log(baseName);
//parsing the path
const parsedPath = path.parse(imgFullPath);
console.log(parsedPath.ext);

logger("Something again happened!");
