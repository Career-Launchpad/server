const GetOfferResolver = async (db, args) => {
  const params = {
    TableName: "Offer",
    Key: {
      offer_id: args.id
    }
  };
  let offer = await db.get(params).promise();
  return offer.Item || {};
};

export default GetOfferResolver;
