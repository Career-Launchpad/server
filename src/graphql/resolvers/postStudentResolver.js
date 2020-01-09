const uuidv4 = require("uuid/v4");

const PostStudentResolver = async (db, args) => {
  let uploadable = {
    ...args.student,
    id: uuidv4()
  };
  const params = {
    TableName: "Student",
    Item: uploadable
  };
  await db.put(params).promise();
  return uploadable;
};

export default PostStudentResolver;
