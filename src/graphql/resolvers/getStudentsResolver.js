import { TABLES } from "../environment";
import { GetMany } from "./resolverHelper";

// Gets all students
const GetStudentsResolver = async (db, args) => {
  const res = await GetMany(db, TABLES.Student);
  return { edges: res };
};

export default GetStudentsResolver;
