/* eslint-disable no-unused-vars */

const { dynamoDocument, dynamoCore } = require('../config/aws-config');

// for testing --> run-func controllers/transact-get.js transactGet

const transactGet = async () => {
  const table = 'Movies';
  const year = 2015;
  const title = 'The Big New Movie 2';

  try {
  // insert & update activity
    const transactGets = await dynamoDocument.transactGet({
      TransactItems: [{
        Get: {
          TableName: 'Movies',
          Key: {
            year: 2015,
            title: 'The Big New Movie',
          },
        },
      }, {
        Get: {
          TableName: 'Category',
          Key: {
            id: 1,
          },
        },
      }],
    }).promise().then((ok) => ok.Responses);
    console.log('🚀 ~ file: transact-get.js ~ line 41 ~ transactGet ~ transactGet', transactGets);

    // return res.status(200).send(result);
  } catch (err) {
    console.log('🚀 ~ file: transact-get.js ~ line 29 ~ transactGet ~ err', err);
    // return res.status(400).send(err);
  }
};

module.exports = {
  transactGet,
};
