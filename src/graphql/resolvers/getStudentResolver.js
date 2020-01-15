const GetStudentResolver = async (db, args) => {
  const params = {
    TableName: "Student",
    Key: {
      id: args.id
    }
  };
  let student = await db.get(params).promise();
  if (!student.Item) return { id: args.id };
  return student.Item;
};

export default GetStudentResolver;
