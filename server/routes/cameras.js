const fs = require('fs');
const express = require("express");
const cameras = express.Router();
const map = require("through2-map");
const csv2json = require("csv2json"); // 18.4 kB
const firstThreeDigits = new RegExp(/[\s]*\d{3}|$/);

cameras.get("/", function(_, res){
  res.contentType("application/json");
  fs.createReadStream('./data/cameras-defb.csv')
    .pipe(map(removeErrors))
    .pipe(map(addCameraNumber))
    .pipe(csv2json({
      separator: ';'
    }))
    .pipe(res);
});

cameras.get("/:camera_id", function(req, res) {
  res.contentType("application/json");
  fs.createReadStream('./data/cameras-defb.csv')
    .pipe(map(removeErrors))
    .pipe(map(addCameraNumber))
    .pipe(map((chunk) => {
      const jsonKeys = chunk.toString().split('\n')[0].split(';');
      const rawCameraValues = filterByNumber(chunk, req.params.camera_id).toString().split(',');
      const cameras = rawCameraValues.map((rawValues) => {
        const rawValueArray = rawValues.split(';');
        let cameraObject = {};
        jsonKeys.map((key, index) => {
          return cameraObject[key] = rawValueArray[index];
        });
        return cameraObject;
      });
      res.send(cameras)
    }));
});

function filterByNumber(chunk, id) {
  const chunkArr = chunk.toString().split('\n');
  return chunkArr.filter((item) => firstThreeDigits.exec(item.toString())[0] === id);
}

function removeErrors(chunk) {
  const chunkArr = chunk.toString().split('\n');
  const filteredItems = chunkArr.filter((item) => {
    const error = new RegExp(/^(ERROR)/)
    return !error.test(item.toString())
  })
  return filteredItems.toString().split(',').join("\n");
}

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
