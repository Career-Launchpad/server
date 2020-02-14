import { TABLES } from "../environment";

const GetOfferResolver = async (db, args) => {
  const params = {
    TableName: TABLES.Offer,
    Key: {
      id: args.id
    }
  };
  let offer = await db.get(params).promise();
  return offer.Item || {};
};

export default GetOfferResolver;
