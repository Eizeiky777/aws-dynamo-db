/* eslint-disable no-unused-vars */

const { dynamoDocument, dynamoCore } = require('../config/aws-config');

// for testing --> run-func controllers/get-movie.js listMovies

const listMovies = async () => {
  const table = 'Movies';
  const year = 2015;
  const title = 'The Big New Movie 2';

  const dataBody = {
    TableName: table,
    Key: {
      year,
      title,
    },
  };

  try {
    const dataDQL = await dynamoDocument.get({ ...dataBody })
      .promise()
      .then((ok) => ok.Item);
    console.log('🚀 ~ file: get-movie.js ~ line 27 ~ listMovies ~ dataDQL', dataDQL);

    // return res.status(200).send(result);
  } catch (err) {
    console.log('🚀 ~ file: get-movie.js ~ line 29 ~ listMovies ~ err', err);
    // return res.status(400).send(err);
  }
};

const listMoviesQuery = async () => {
  const table = 'Movies';
  const year = 1985;

  const dataBody = {
    TableName: table,
    KeyConditionExpression: '#yr = :yyyy',
    ExpressionAttributeNames: {
      '#yr': 'year',
    },
    ExpressionAttributeValues: {
      ':yyyy': year,
    },
  };

  try {
    const dataDQL = await dynamoDocument.query({ ...dataBody })
      .promise()
      .then((ok) => ok);
    console.log('🚀 ~ file: get-movie.js ~ line 27 ~ listMoviesQuery ~ dataDQL', dataDQL);

    // return res.status(200).send(result);
  } catch (err) {
    console.log('🚀 ~ file: get-movie.js ~ line 29 ~ listMoviesQuery ~ err', err);
    // return res.status(400).send(err);
  }
};

module.exports = {
  listMovies,
  listMoviesQuery,
};
