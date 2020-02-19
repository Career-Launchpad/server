import { TABLES } from "../environment";
import { GetFiltered } from "./resolverHelper";
/*
 * Returns a list of majors
 */

const GetMajorsResolver = async (db, args) => {
  let students = await GetFiltered(db, TABLES.Student, args.filters);
  let majors = new Set();
  for (let i in students) {
    majors.add(students[i].major);
  }
  return Array.from(majors) || [];
};

export default GetMajorsResolver;
