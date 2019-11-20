const promisify = fn =>
  new Promise((resolve, reject) => {
    fn((err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });

const StudentResolver = (db, args) => {
  const params = {
    TableName: "Student",
    Key: {
      id: args.user_id
    }
  };
  return promisify(callback => {
    db.get(params, callback);
  }).then(result => {
    if (!result.Item) return { id: args.user_id };
    return result.Item;
  });
};

export { StudentResolver };
