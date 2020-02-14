import { TABLES } from "../environment";

const PostStudentResolver = async (db, args) => {
  let uploadable = {
    ...args.student
  };
  const params = {
    TableName: TABLES.Student,
    Item: uploadable
  };
  await db.put(params).promise();
  return uploadable;
};

export default PostStudentResolver;
