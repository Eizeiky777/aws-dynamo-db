/* eslint-disable no-unused-vars */

const { dynamoDocument, dynamoCore } = require('../config/aws-config');

// for testing --> run-func controllers/delete-table.js deleteTable

const deleteTable = async () => {
  const params = {
    TableName: 'Movies',
  };

  try {
    const dataDQL = await dynamoCore.deleteTable(params)
      .promise()
      .then((ok) => ok);
    console.log('🚀 ~ file: delete-movie.js ~ line 27 ~ deleteTable ~ dataDQL', dataDQL);

    // return res.status(200).send(result);
  } catch (err) {
    console.log('🚀 ~ file: delete-movie.js ~ line 29 ~ deleteTable ~ err', err);
    // return res.status(400).send(err);
  }
};

module.exports = {
  deleteTable,
};
