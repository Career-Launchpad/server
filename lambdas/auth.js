"use strict";

const AWS = require("aws-sdk"); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.auth = async (event, context, callback) => {
  const params = { TableName: "Aliases" };
  let aliasList = await dynamoDb.scan(params).promise();

  response = {
    statusCode: 200,
    body: JSON.stringify({ aliasList })
  };

  callback(null, response);
};
