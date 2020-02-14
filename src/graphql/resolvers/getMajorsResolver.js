import { TABLES } from "../environment";
import { GetMany } from "./resolverHelper";
/*
 * Returns a list of majors
 */

const GetMajorsResolver = async (db, args) => {
  let students = await GetMany(db, TABLES.Student);
  let majors = new Set();
  for (let i in students) {
    majors.add(students[i].major);
  }
  return Array.from(majors) || [];
};

export default GetMajorsResolver;
