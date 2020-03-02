'use-strict';
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');

app.use(cors());

const cameras = require("./routes/cameras")
app.use("/api/v1/cameras", cameras)

app.use(function(req, res) {
  res.status(404).send({url: `'${req.originalUrl}' not found`})
});

app.listen(port, function() {
  console.log('RESTful API server started on: ', port);
});
