import { TABLES } from "../environment";
import { GetMany } from "./resolverHelper";
import removeEmptyStrings from "../utils/removeEmptyStrings";

// Gets all offers
const GetOffersResolver = async db => {
  let offers = await GetMany(db, TABLES.Offer);
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
    console.log(bonusesParams);
    let bonuses = await db.query(bonusesParams).promise();
    res.push({ ...offer, bonuses: bonuses.Items });
  }
  return { edges: res };
};

export default GetOffersResolver;
