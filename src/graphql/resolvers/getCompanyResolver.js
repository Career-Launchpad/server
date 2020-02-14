import { GetSingle } from "./resolverHelper";
import { TABLES } from "../environment";

const GetCompanyResolver = async (db, args) => {
  return await GetSingle(db, TABLES.Company, args.id);
};

export default GetCompanyResolver;
