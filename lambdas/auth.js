"use strict";

const AWS = require("aws-sdk"); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.auth = (event, context, callback) => {
  const data = JSON.parse(event.body);

  let email = data.email;
  let domain = email.split("@")[1];

  const params = {
    TableName: "Aliases",
    Key: {
      alias: domain
    }
  };
  dynamoDb.get(params, (error, result) => {
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({ verified: false, error })
      });
      return;
    }
    let response;
    if (result.Item) {
      response = {
        statusCode: 200,
        body: JSON.stringify({ verified: true })
      };
    } else {
      response = {
        statusCode: 401,
        body: JSON.stringify({
          verified: false,
          error:
            "Please register using an email address managed under your school's domain"
        })
      };
    }

    callback(null, response);
  });
};
