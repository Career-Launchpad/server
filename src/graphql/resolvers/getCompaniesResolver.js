import { TABLES } from "../environment";
import { dbScan } from "./resolverHelper";

/*
 * Returns a filtered list of companies
 */
const GetCompaniesResolver = async (db, args) => {
  let results = await dbScan(db, TABLES.Company, args.filters);
  return { edges: results };
};

export default GetCompaniesResolver;
