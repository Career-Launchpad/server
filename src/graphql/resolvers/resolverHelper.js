const dbQuery = async (db, table, item_id) => {
  const params = {
    TableName: table,
    Key: {
      id: item_id
    }
  };
  let response = await db.get(params).promise();
  return response.Item || {};
};

const dbScan = async (db, table, filters) => {
  let FilterExpression;
  let ExpressionAttributeValues;
  let ExpressionAttributeNames;

  if (filters) {
    ExpressionAttributeValues = {};
    ExpressionAttributeNames = {};
    FilterExpression = "";
    for (let i in filters) {
      const { field, value, comp } = filters[i];
      const fieldName = `#${field}`;
      FilterExpression += `${fieldName} ${comp} :${field}`;
      ExpressionAttributeValues[`:${field}`] = value;
      ExpressionAttributeNames[`${fieldName}`] = field;
      if (i < filters.length - 1) {
        FilterExpression += " AND ";
      }
    }
  }

  const params = {
    TableName: table,
    FilterExpression,
    ExpressionAttributeValues,
    ExpressionAttributeNames
  };

  let results = await db.scan(params).promise();
  return results.Items || [];
};

export { dbQuery, dbScan };
