import { GetSingle } from "./resolverHelper";
import { TABLES } from "../environment";

const GetOfferResolver = async (db, args) => {
  return await GetSingle(db, TABLES.Offer, args.id);
};

export default GetOfferResolver;
