import { TABLES } from "../environment";

const GetStudentResolver = async (db, args) => {
  const params = {
    TableName: TABLES.Student,
    Key: {
      id: args.id
    }
  };
  let student = await db.get(params).promise();
  return student.Item || {};
};

export default GetStudentResolver;
