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

const GetFiltered = async (db, table, filters = []) => {
  let KeyCondition = "";
  let Expression = {};

  for (temp in filters) {
    const item = temp.field;
    const value = temp.value;
    const comp = temp.comp;
    Expression[`:${item}`] = { S: value };
    KeyCondition += `${item} ${comp} :${item} `;
  }

  const params = {
    TableName: table,
    ExpressionAttributeValues: Expression,
    KeyConditionExpression: KeyCondition
  };

  results = await db.scan(params).promise();
  return results.Items || [];
};

export { GetSingle, GetMany, GetFiltered };
