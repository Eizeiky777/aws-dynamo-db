/* eslint-disable no-unused-vars */
// run below with --> node sample-data/moviedata.js

const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');

const moviedataJSON = path.join(__dirname, './moviedata.json');

AWS.config.update({
  region: 'ap-southeast-1',
  endpoint: 'http://localhost:1818',
});

// start DB
const docClient = new AWS.DynamoDB.DocumentClient();

console.log('Importing movies into DynamoDB. Please wait.');

const allMovies = JSON.parse(fs.readFileSync(moviedataJSON, 'utf8'));
allMovies.forEach((movie) => {
  const params = {
    TableName: 'Movies',
    Item: {
      year: movie.year,
      title: movie.title,
      info: movie.info,
    },
  };

  docClient.put(params, (err, data) => {
    if (err) {
      console.error('Unable to add movie', movie.title, '. Error JSON:', JSON.stringify(err, null, 2));
    } else {
      console.log('PutItem succeeded:', movie.title);
    }
  });
});
