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

  if (filters) {
    ExpressionAttributeValues = {};
    FilterExpression = "";
    for (let i in filters) {
      const item = filters[i].field;
      const value = filters[i].value;
      const comp = filters[i].comp;
      ExpressionAttributeValues[`:${item}`] = value;
      FilterExpression += `${item} ${comp} :${item}`;
      if (i < filters.length - 1) {
        FilterExpression += " AND ";
      }
    }
  }

  const params = {
    TableName: table,
    FilterExpression,
    ExpressionAttributeValues
  };

  let results = await db.scan(params).promise();
  return results.Items || [];
};

export { dbQuery, dbScan };
