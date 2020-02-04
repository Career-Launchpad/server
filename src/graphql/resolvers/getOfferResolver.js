import { TABLES } from "../environment";

const GetOfferResolver = async (db, args) => {
  const params = {
    TableName: TABLES.Offer,
    Key: {
      offer_id: args.offer_id
    }
  };
  let offer = await db.get(params).promise();
  return offer.Item || {};
};

export default GetOfferResolver;
