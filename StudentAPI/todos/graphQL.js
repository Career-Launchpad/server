'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.graphQL = (event, context, callback) => {
  const data = JSON.parse(event.body);
  console.log(data);

  const response = {
    statusCode: 200,
    body: "Working",
  };
  callback(null, response);
};
