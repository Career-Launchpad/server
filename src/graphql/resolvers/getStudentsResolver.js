// TODO: Finish GetStudentsResolver
const GetStudentsResolver = async (db, args) => {
  const params = {
    TableName: "Student"
  };
  let students = await db.scan(params, callback).promise();
  if (!students.Items) {
    return { id: args.id };
  } else {
    return students.Items;
  }
};

export default GetStudentsResolver;
