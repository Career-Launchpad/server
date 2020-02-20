import { dbQuery } from "./resolverHelper";
import { TABLES } from "../environment";

const GetOfferResolver = async (db, args) => {
  return await dbQuery(db, TABLES.Offer, args.id);
};

export default GetOfferResolver;
