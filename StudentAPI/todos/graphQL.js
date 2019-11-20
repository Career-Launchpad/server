'use strict';

const AWS = require('aws-sdk');

import RootQuery from './schema'

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.graphQL = (event, context, callback) => {
  const response = {
      statusCode: 200,
      body: "Worked",
      headers: {
      "Access-Control-Allow-Origin" : "*",
      "Access-Control-Allow-Credentials" : true  }
    };
    callback(null, response);
};


/*=> graphql(RootQuery, event.queryStringParameters.query)
  .then(
    result => callback(null, {statusCode: 200, body: JSON.stringify(result)}),
    err => callback(err)
  )*/
