"use strict";

const AWS = require("aws-sdk"); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

// Goes through all of the offers and counts the number of offers
// that are associated with each company in the database
module.exports.countOffers = async (event, context, callback) => {
  try {
    const params = { TableName: TABLES.Offer };

    let offersList = await dynamoDb.scan(params).promise();
    let data = {};
    const companyOffers = offersList.map(o => o.company_id);
    for (let i in companyOffers) {
      if (data[companyOffers[i]]) {
        data[companyOffers[i]] += 1;
      } else {
        data[companyOffers[i]] = 1;
      }
    }

    for (let j in data) {
      let addCompanyParams = {
        TableName: TABLE.Company,
        Key: {
          id: j
        },
        UpdateExpression: "set offersCount = :r",
        ExpressionAttributeValues: {
          ":r": data[j]
        },
        ReturnValues: "UPDATED_NEW"
      };
      await db.update(addCompanyParams).promise();
    }

    response = {
      statusCode: 200,
      body: JSON.stringify(data)
    };

    callback(null, response);
  } catch (e) {
    response = {
      statusCode: 500,
      body: JSON.stringify(e)
    };
    callback(null, response);
  }
};
