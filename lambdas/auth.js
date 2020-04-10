"use strict";

const AWS = require("aws-sdk");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.auth = async (event, context, callback) => {
  const params = { TableName: "Aliases" };

  let scanResults = [];
  let items;
  do {
    items = await dynamoDb.scan(params).promise();
    items.Items.forEach(item => scanResults.push(item));
    params.ExclusiveStartKey = items.LastEvaluatedKey;
  } while (typeof items.LastEvaluatedKey != "undefined");

  const response = {
    statusCode: 200,
    body: JSON.stringify(scanResults)
  };

  callback(null, response);
};
