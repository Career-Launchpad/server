import { TABLES } from "../environment";
import { dbScan } from "./resolverHelper";

/*
 * Returns a filtered list of companies and their offers
 */
const GetCompaniesOffersResolver = async (db, args) => {
  let offers = await dbScan(db, TABLES.Offer, null);
  let results = offers.filter(o => o.company.id === args.filters[0].value);
  return { edges: results };
};

export default GetCompaniesOffersResolver;
