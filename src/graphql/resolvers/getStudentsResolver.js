import { TABLES } from "../environment";
import { GetMany } from "./resolverHelper";

// Gets all students
const GetStudentsResolver = async (db, args) => {
  return await GetMany(db, TABLES.Student);
};

export default GetStudentsResolver;
