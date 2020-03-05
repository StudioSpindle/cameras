'use-strict'

const fetch = require('node-fetch');
const yargs = require('yargs');
const map = require("through2-map");

const apiUrl = 'http://localhost:5000/api/v1/cameras';

const argv = yargs
  .command('name', 'Search cameras by name', {
    alias: 'n',
    description: 'the name to search for',
    type: 'string'
  })
  .command('id', 'Search cameras by id', {
    alias: 'n',
    description: 'the id to search for',
    type: 'string'
  })
  .argv;

if (argv.name) {
  fetch(apiUrl)
    .then(checkFetchStatus)
    .then((res) => {
      res.body
        .pipe(map(findMatchByName))
        .pipe(map(formatJSONToBuffer))
        .pipe(process.stdout)
    });
}

if (argv.id) {
  fetch(`${apiUrl}/${argv.id}`)
    .then((res) => res.json())
    .then((json) => {
      const formattedCameras = json.map((camera) => formatObjectToOutputString(camera))
      process.stdout.write(Buffer.from(formattedCameras.join('').toString()))
    })
}

function formatJSONToBuffer(chunk) {
  const { Number, Camera, Latitude, Longitude } = JSON.parse(chunk.toString());
  const formattedOutput = `${Number} | ${Camera} | ${Latitude} | ${Longitude} \n`
  return Buffer.from(formattedOutput);
}

function formatObjectToOutputString(obj) {
  const { Number, Camera, Latitude, Longitude } = obj;
  const formattedOutput = `${Number} | ${Camera} | ${Latitude} | ${Longitude} \n`
  return formattedOutput;
}

function findMatchByName(chunk) {
  const normalizedChunk = chunk.toString().toLowerCase();
  const normalizedName = argv.name.toString().toLowerCase();
  if (normalizedChunk.includes(normalizedName)) {
    return chunk;
  }
}

function checkFetchStatus(res) {
  if (res.ok) {
      return res;
  } else {
      throw `${res.statusText}. Are you sure that the server is running on ${apiUrl}`;
  }
}
