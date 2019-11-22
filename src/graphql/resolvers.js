const StudentResolver = (db, args) => {
  const params = {
    TableName: "Student",
    Key: {
      id: args.user_id
    }
  };
  return new Promise((resolve, reject) => {
    db.get(params, (err, result) => {
      if (err) reject(err);
      if (!result.Item)
        reject(new RangeError(`Student with id: ${args.user_id} not found`));
      return resolve(result.Item);
    });
  });
};

export { StudentResolver };
