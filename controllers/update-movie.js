/* eslint-disable no-unused-vars */

const { dynamoDocument, dynamoCore } = require('../config/aws-config');

// for testing --> run-func controllers/update-movie.js updateMovie

const updateMovie = async () => {
  const table = 'Movies';
  const year = 2015;
  const title = 'The Big New Movie 2';

  const dataBody = {
    TableName: table,
    Key: {
      year,
      title,
    },
    UpdateExpression: 'set info.rating = :r, info.plot=:p, info.actors=:a', // :r :p :a this mean common variable that will be filled with the new data
    ExpressionAttributeValues: {
      ':r': 5.8,
      ':p': 'Everything happens all at once.',
      ':a': ['Larry', 'Moe', 'Curly'],
    },
  };

  try {
    const dataDQL = await dynamoDocument.update({ ...dataBody, ReturnValues: 'UPDATED_NEW' })
      .promise()
      .then((ok) => ok);
    console.log('🚀 ~ file: update-movie.js ~ line 27 ~ updateMovie ~ dataDQL', dataDQL);

    // return res.status(200).send(result);
  } catch (err) {
    console.log('🚀 ~ file: update-movie.js ~ line 29 ~ updateMovie ~ err', err);
    // return res.status(400).send(err);
  }
};

/// Step 3.4: Increment an Atomic Counter
const updateMovieIncrement = async () => {
  const table = 'Movies';
  const year = 2015;
  const title = 'The Big New Movie 2';

  const dataBody = {
    TableName: table,
    Key: {
      year,
      title,
    },
    UpdateExpression: 'set info.rating = info.rating + :val',
    ExpressionAttributeValues: {
      ':val': 1,
    },
  };

  try {
    const dataDQL = await dynamoDocument.update({ ...dataBody, ReturnValues: 'UPDATED_NEW' })
      .promise()
      .then((ok) => ok);
    console.log('🚀 ~ file: update-movie.js ~ line 27 ~ updateMovie ~ dataDQL', dataDQL);

    // return res.status(200).send(result);
  } catch (err) {
    console.log('🚀 ~ file: update-movie.js ~ line 29 ~ updateMovie ~ err', err);
    // return res.status(400).send(err);
  }
};

// Step 3.5: Update an Item (Conditionally)
const updateMovieConditional = async () => {
  const table = 'Movies';
  const year = 2015;
  const title = 'The Big New Movie 2';

  // if condition does not meet it will throw error
  const dataBody = {
    TableName: table,
    Key: {
      year,
      title,
    },
    UpdateExpression: 'remove info.actors[0]',
    ConditionExpression: 'size(info.actors) >= :num',
    ExpressionAttributeValues: {
      ':num': 3,
    },
  };

  try {
    const dataDQL = await dynamoDocument.update({ ...dataBody, ReturnValues: 'UPDATED_NEW' })
      .promise()
      .then((ok) => ok);
    console.log('🚀 ~ file: update-movie.js ~ line 27 ~ updateMovie ~ dataDQL', dataDQL);

    // return res.status(200).send(result);
  } catch (err) {
    console.log('🚀 ~ file: update-movie.js ~ line 29 ~ updateMovie ~ err', err);
    // return res.status(400).send(err);
  }
};

module.exports = {
  updateMovie,
  updateMovieIncrement,
  updateMovieConditional,
};
