const GetStudentResolver = async (db, args) => {
  const params = {
    TableName: "Student",
    Key: {
      id: args.id
    }
  };
  return await db.get(params, (err, res) => {
    if (err) {
      return err;
    }
    if (!res.Item) return { id: args.id };
    return res.item;
  });
};

export default GetStudentResolver;
