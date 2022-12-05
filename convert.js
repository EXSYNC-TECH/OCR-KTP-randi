const fs = require("fs");
const gm = require("gm").subClass({ imageMagick: "7+" });
// let jimp = require("jimp");
// (async function () {
//   const image = await jimp.read("images/ktp_randi.jpeg");

//   //   image.pixelate(5, 50, 50, 190, 200);

//   image
//     .color([{ apply: "greyscale", params: [90] }], function (err) {
//       if (err) throw err;
//     })
//     .write("images/randi-converted.jpeg");
// })();

// const sharp = require("sharp");

// sharp("images/ktp_randi.jpeg")
//   .resize(1137, 716, {
//     fit: "contain",
//   })
//   .toFile("images/memek.jpeg");

gm("images/ktp_randi6.jpg")
  .density(600, 600) // increase dpi
  .resizeExact(1170, 755) // resize with ratio
  .quality(100)
  .crop(569, 647, 266, 5) // crop to trim only text part
  .autoOrient()
  .quality(100)
  .colorspace("GRAY") // make picture grayscale
  .threshold("40", "Threshold-White") // make picture black&white
  .quality(100)
  .write("images/converteds.jpeg", function (err) {
    if (!err) console.log("done");
    else console.log(err);
  });
