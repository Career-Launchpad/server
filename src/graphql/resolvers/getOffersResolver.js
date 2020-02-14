import { TABLES } from "../environment";
import removeEmptyStrings from "../utils/removeEmptyStrings";

const GetOffersResolver = async db => {
  const params = {
    TableName: TABLES.Offer
  };
  let offers = await db.scan(params).promise();
  let res = [];

  for await (let offer of offers.Items) {
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
