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

export { GetSingle, GetMany };
