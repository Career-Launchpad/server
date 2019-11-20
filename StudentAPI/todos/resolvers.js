const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB({ region: 'us-east-1' });
const _ = require('lodash');

displayItem = function(err, data) {
    if (err) {
        console.log('ERROR', err);
    } else {
        console.log('SUCCESS', data.Item);
    }
    return data.Item;
}

module.exports = {
    console.log("Entered Resolvers");
    studentResolver: function(id) {
        console.log('in student resolver ', id)
        const params = {
            TableName: 'Student',
            Key: {
                id: {
                    S: id
                }
            }
        };
        dynamoDb.getItem(params, function(err, data) { displayItem(err, data) });
    },
    histogramResolver: function(id) {
        console.log('in histogram resolver');
    },
    mapResolver: function(id) {
        console.log('in map resolver');
    },
    barChartResolver: function(id) {
        console.log('in bar chart resolver');
    },
    adminResolver: function(id) {
        console.log('in admin resolver')
    }
};
