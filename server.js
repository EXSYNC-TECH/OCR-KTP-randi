const express = require("express");
const multer = require("multer");

const app = express();
const fs = require("fs");

// const gm = require("gm");
// // var bodyParser = require("body-parser");
// // var tesseract = require("node-tesseract");

let Tesseract = require("tesseract.js");

// // Middleware
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT | 5000;

let Storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "/images");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

let upload = multer({
  storage: Storage,
}).array("image", 3);

// Route
app.post("/", (req, res) => {
  // res.json(req.body.name);
});

app.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.send("Oops, something went wrong");
    }
    return res.send("File uploaded successfully");
  });
});

let image = fs.readFileSync(__dirname + "/images/converteds.jpeg", {
  encoding: null,
});

// // console.log(image);
// // Encode with tesseract
// // app.get("/showdata", (req, res) => {
// //   Tesseract.recognize(image)
// //     .progress(function (p) {
// //       console.log("progress", p);
// //     })
// //     .then(function (result) {
// //       res.json(result);
// //     });
// // });
Tesseract.recognize(image).then((result) => {
  let data_ktp = result.data.text;
  console.log(data_ktp);
});

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
