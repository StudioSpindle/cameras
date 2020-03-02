const fs = require('fs');
const express = require("express");
const cameras = express.Router();
const map = require("through2-map");
const csv2json = require("csv2json"); // 18.4 kB
const firstThreeDigits = new RegExp(/[\s]*\d{3}/);

cameras.get("/", function(_, res){
  fs.createReadStream('./data/cameras-defb.csv')
    .pipe(map(addCameraNumber))
    .pipe(csv2json({
      separator: ';'
    }))
    .pipe(res);
});

function addCameraNumber(chunk) {
  const chunkArr = chunk.toString().split('\n');
  const chunkWithNumber = chunkArr.map((line, index) => {
    if (index === 0) {
      return 'Number;' + line
    }
    return firstThreeDigits.exec(line) + ';' + line
  })
  return chunkWithNumber.toString().split(',').join("\n")
}

module.exports = cameras;
