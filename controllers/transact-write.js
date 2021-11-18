/* eslint-disable no-unused-vars */

const { dynamoDocument, dynamoCore } = require('../config/aws-config');

// for testing --> run-func controllers/transact-write.js transactWrite

const transactWrite = async () => {
  const table = 'Movies';
  const year = 2015;
  const title = 'The Big New Movie 2';

  try {
  // insert & update activity
    const transactWrites = await dynamoDocument.transactWrite({
      TransactItems: [
        //       {
        //     Put: {
        //       TableName: table,
        //       Item: {
        //         year,
        //         title,
        //         info: {
        //           plot: 'Nothing happens at all.',
        //           rating: 0,
        //         },
        //       },
        //     },
        //   },
        {
          Update: {
            TableName: 'Category',
            Key: {
              id: 1,
            },
            UpdateExpression: 'set #n = :x',
            ConditionExpression: 'description <> :text AND description <> :text',
            ExpressionAttributeNames: { '#n': 'name' },
            ExpressionAttributeValues: {
              ':x': 'Sport',
              ':text': 'test',
            },
          },
        }],
    }).promise().then((ok) => ok);
    console.log('🚀 ~ file: transact-write.js ~ line 41 ~ transactWrite ~ transactWrite', transactWrites);

    // return res.status(200).send(result);
  } catch (err) {
    console.log('🚀 ~ file: transact-write.js ~ line 29 ~ transactWrite ~ err', err);
    // return res.status(400).send(err);
  }
};

module.exports = {
  transactWrite,
};
