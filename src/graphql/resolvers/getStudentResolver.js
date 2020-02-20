import { TABLES } from "../environment";
import { dbQuery } from "./resolverHelper";

const GetStudentResolver = async (db, args) => {
  return await dbQuery(db, TABLES.Student, args.id);
};

export default GetStudentResolver;
