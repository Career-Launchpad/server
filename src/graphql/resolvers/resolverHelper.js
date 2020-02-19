const GetSingle = async (db, table, item_id) => {
  const params = {
    TableName: table,
    Key: {
      id: item_id
    }
  };
  let response = await db.get(params).promise();
  return response.Item || {};
};

const GetMany = async (db, table) => {
  const params = {
    TableName: table
  };
  let results = await db.scan(params).promise();
  return results.Items || [];
};

const GetFiltered = async (db, table, filters) => {
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

export { GetSingle, GetMany, GetFiltered };
