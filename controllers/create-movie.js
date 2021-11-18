/* eslint-disable no-unused-vars */

const { dynamoDocument, dynamoCore } = require('../config/aws-config');

// for testing --> run-func controllers/create-user.js createMovie

const createMovie = async () => {
  const table = 'Movies';
  const year = 2015;
  const title = 'The Big New Movie 2';

  const dataBody = {
    TableName: table,
    Item: {
      year,
      title,
      info: {
        plot: 'Nothing happens at all.',
        rating: 0,
      },
    },
  };

  try {
    console.log('Adding a new item...');

    // ALL_OLD = return old value if when put data has been existing
    const dataDQL = await dynamoDocument.put({ ...dataBody, ReturnValues: 'ALL_OLD' })
      .promise()
      .then((ok) => ok);
    console.log('🚀 ~ file: create-user.js ~ line 27 ~ createMovie ~ dataDQL', dataDQL);

    const dataSQL = await dynamoCore
      .executeStatement({ Statement: 'select * from Movies where year = 2015' })
      .promise()
      .then((ok) => ok.Items);

    console.log('🚀 ~ file: create-user.js ~ line 28 ~ createMovie ~ dataSQL', JSON.stringify(dataSQL));
    console.log(dataSQL[0].title.S);

    // return res.status(200).send(result);
  } catch (err) {
    console.log('🚀 ~ file: create-user.js ~ line 29 ~ createMovie ~ err', err);
    // return res.status(400).send(err);
  }
};

module.exports = {
  createMovie,
};
