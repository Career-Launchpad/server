import { TABLES } from "../environment";
import { dbScan } from "./resolverHelper";
import removeEmptyStrings from "../utils/removeEmptyStrings";
import GetCompanyResolver from "./getCompanyResolver";

/*
 * Returns a list of offers
 */
const GetOffersResolver = async (db, args) => {
  let offers = await dbScan(db, TABLES.Offer, args.filters);
  return { edges: offers || [] };
};

export default GetOffersResolver;
