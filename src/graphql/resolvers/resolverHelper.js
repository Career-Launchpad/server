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

export { GetSingle };
