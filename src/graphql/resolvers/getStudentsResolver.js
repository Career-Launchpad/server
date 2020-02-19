import { TABLES } from "../environment";
import { GetMany, GetFiltered } from "./resolverHelper";

// Gets all students
const GetStudentsResolver = async (db, args) => {
  const res = await GetFiltered(db, TABLES.Student, args.filters);
  return { edges: res };
};

export default GetStudentsResolver;
