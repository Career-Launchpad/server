import { TABLES } from "../environment";
import { GetMany, GetFiltered } from "./resolverHelper";

/*
 * Returns a list of companies
 */
const GetCompaniesResolver = async (db, args) => {
  let results = await GetFiltered(db, TABLES.Company, args.filters);
  return { edges: results };
};

export default GetCompaniesResolver;
