import { TABLES } from "../environment";

/*
 * Returns a list of majors
 */

const GetMajorsResolver = async (db, args) => {
  const params = {
    TableName: TABLES.Student
  };
  let students = await db.scan(params).promise();
  students = students.Items;
  let majors = new Set();
  for (let i in students) {
    majors.add(students[i].major);
  }
  return Array.from(majors) || [];
};

export default GetMajorsResolver;
