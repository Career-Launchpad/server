import { TABLES } from "../environment";
import { GetMany, GetSingle, GetFiltered } from "./resolverHelper";
import removeEmptyStrings from "../utils/removeEmptyStrings";
import GetCompanyResolver from "./getCompanyResolver";

// Gets all offers
const GetOffersResolver = async (db, args) => {
  let offers = await GetFiltered(db, TABLES.Offer, args.filters);

  let res = [];
  for await (let offer of offers) {
    let offerId = offer.id;
    let bonusesParams = removeEmptyStrings({
      TableName: TABLES.Bonus,
      KeyConditionExpression: "#i = :id",
      ExpressionAttributeNames: {
        "#i": "id"
      },
      ExpressionAttributeValues: {
        ":id": offerId
      }
    });
    let bonuses = await db.query(bonusesParams).promise();
    let company = await GetCompanyResolver(db, { id: offer.company_id });
    res.push({ ...offer, company, bonuses: bonuses.Items });
  }
  return { edges: res || [] };
};

export default GetOffersResolver;
