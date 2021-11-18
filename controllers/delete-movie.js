/* eslint-disable no-unused-vars */

const { dynamoDocument, dynamoCore } = require('../config/aws-config');

// for testing --> run-func controllers/delete-movie.js deleteMovie

const deleteMovie = async () => {
  const table = 'Movies';
  const year = 2015;
  const title = 'The Big New Movie 2';

  const dataBody = {
    TableName: table,
    Key: {
      year,
      title,
    },
    ConditionExpression: 'info.rating > :val',
    ExpressionAttributeValues: {
      ':val': 5.0,
    },
  };

  try {
    const dataDQL = await dynamoDocument.delete({ ...dataBody })
      .promise()
      .then((ok) => ok);
    console.log('🚀 ~ file: delete-movie.js ~ line 27 ~ deleteMovie ~ dataDQL', dataDQL);

    // return res.status(200).send(result);
  } catch (err) {
    console.log('🚀 ~ file: delete-movie.js ~ line 29 ~ deleteMovie ~ err', err);
    // return res.status(400).send(err);
  }
};

module.exports = {
  deleteMovie,
};
