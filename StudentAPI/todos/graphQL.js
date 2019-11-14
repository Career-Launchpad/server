'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies


const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.graphQL = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);
  console.log(data);

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      ID: uuid.v1(),
      created_at: timestamp,
      college_id: data.college_id,
      major: data.major,
      gender: data.gender,
      ethnicity: data.ethnicity,
      offers: data.offers,
    },
  };

  // write the todo to the database
  dynamoDb.put(params, (error) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t create the todo item.',
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(params.Item),
    };
    callback(null, response);
  });
};
