'use-strict'

const fetch = require('node-fetch');
const yargs = require('yargs');
const map = require("through2-map");

const apiUrl = 'http://localhost:5000/api/v1/cameras';

const argv = yargs
  .command('name', 'Search a camera by name', {
    alias: 'n',
    description: 'the name to search for',
    type: 'string'
  })
  .argv;

if (argv.name) {
  fetch(apiUrl)
    .then(checkFetchStatus)
    .then((res) => {
      res.body
        .pipe(map(findMatch))
        .pipe(map(formatOutput))
        .pipe(process.stdout)
    });
}

function findMatch(chunk) {
  const normalizedChunk = chunk.toString().toLowerCase();
  const normalizedName = argv.name.toLowerCase();
  if (normalizedChunk.includes(normalizedName)) {
    return chunk;
  }
}

function formatOutput(chunk) {
  const { Number, Camera, Latitude, Longitude } = JSON.parse(chunk.toString());
  const formattedOutput = `${Number} | ${Camera} | ${Latitude} | ${Longitude} \n`
  return Buffer.from(formattedOutput);
}

function checkFetchStatus(res) {
  if (res.ok) {
      return res;
  } else {
      throw `${res.statusText}. Are you sure that the server is running on ${apiUrl}`;
  }
}
