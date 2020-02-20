import { TABLES } from "../environment";
import { dbScan } from "./resolverHelper";
/*
 * Returns a list of majors
 */

const GetMajorsResolver = async (db, args) => {
  let students = await dbScan(db, TABLES.Student, args.filters);
  let majors = new Set();
  for (let i in students) {
    majors.add(students[i].major);
  }
  return Array.from(majors) || [];
};

export default GetMajorsResolver;
