import { TABLES } from "../environment";
import { GetSingle } from "./resolverHelper";

const GetStudentResolver = async (db, args) => {
  return await GetSingle(db, TABLES.Student, args.id);
};

export default GetStudentResolver;
