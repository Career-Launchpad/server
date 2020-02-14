import { TABLES } from "../environment";
import { GetMany } from "./resolverHelper";

/*
 * Returns a list of companies
 */
const GetCompaniesResolver = async (db, args) => {
  return await GetMany(db, TABLES.Company);
};

export default GetCompaniesResolver;
