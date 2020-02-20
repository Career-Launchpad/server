import { dbQuery } from "./resolverHelper";
import { TABLES } from "../environment";

const GetCompanyResolver = async (db, args) => {
  return await dbQuery(db, TABLES.Company, args.id);
};

export default GetCompanyResolver;
