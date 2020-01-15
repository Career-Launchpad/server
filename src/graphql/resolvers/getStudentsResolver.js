// TODO: Finish GetStudentsResolver
const GetStudentsResolver = async (db, args) => {
  const params = {
    TableName: "Student"
  };
  let students = await db.scan(params).promise();
  if (!students.Items) {
    return [];
  } else {
    return students.Items;
  }
};

export default GetStudentsResolver;
