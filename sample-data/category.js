/* eslint-disable no-unused-vars */
// run below with --> node sample-data/category.js

const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');

const categoryJSON = path.join(__dirname, './category.json');

AWS.config.update({
  region: 'ap-southeast-1',
  endpoint: 'http://localhost:1818',
});

// start DB
const docClient = new AWS.DynamoDB.DocumentClient();

console.log('Importing categories into DynamoDB. Please wait.');

const allCategory = JSON.parse(fs.readFileSync(categoryJSON, 'utf8'));
console.log('🚀 ~ file: category.js ~ line 21 ~ allCategory', allCategory);

allCategory.forEach((category) => {
  const params = {
    TableName: 'Category',
    Item: {
      id: category.id,
      name: category.name,
      description: category.description,
      attributes: category.attributes,
      status: category.status,
    },
  };

  docClient.put(params, (err, data) => {
    if (err) {
      console.error('Unable to add category', category.name, '. Error JSON:', JSON.stringify(err, null, 2));
    } else {
      console.log('PutItem succeeded:', category.name);
    }
  });
});
