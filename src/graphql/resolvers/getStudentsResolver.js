import { TABLES } from "../environment";
import { dbScan } from "./resolverHelper";
/*
 * Gets a list of students
 */
const GetStudentsResolver = async (db, args) => {
  const res = await dbScan(db, TABLES.Student, args.filters);
  return { edges: res };
};

export default GetStudentsResolver;
