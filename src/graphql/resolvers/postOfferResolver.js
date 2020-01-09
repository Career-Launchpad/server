const uuidv4 = require("uuid/v4");

const PostOfferResolver = async (db, args) => {
  const offer = args.offer;

  const location = offer.location;
  delete offer.location;
  const bonuses = offer.bonuses;
  delete offer.bonuses;

  const location_id = `${location.city}${location.state}${location.country}`.replace(
    /\s/g,
    ""
  );

  const locationParams = {
    TableName: "Location",
    Item: { location_id, ...location }
  };

  await db.put(locationParams).promise();

  const companyParams = {
    TableName: "Company",
    IndexName: "name-index",
    KeyConditionExpression: "#nm = :name",
    ExpressionAttributeNames: {
      "#nm": "name"
    },
    ExpressionAttributeValues: {
      ":name": offer.company_name
    }
  };
  let companyName = null;
  let company = await db.query(companyParams).promise();
  let uuid = uuidv4();
  // companyName = company.Items[0].name;
  console.log(company);
  if (company.Items.length === 0) {
    let addCompanyParams = {
      TableName: "Company",
      Item: { id: uuid, name: offer.company_name }
    };
    company = await db.put(addCompanyParams).promise();
    companyName = company.Items[0].name;
  } else {
    companyName = company.Items[0].name;
  }

  // upload bonuses to Bonus table
  if (bonuses) {
    for await (let bonus of bonuses) {
      const postBonusParams = {
        TableName: "Bonus",
        Item: {
          id: uuid,
          ...bonus
        }
      };
      await db.put(postBonusParams).promise();
    }
  }

  let uploadable = {
    ...args.offer,
    company_name: companyName,
    timestamp: new Date().getTime(),
    offer_id: uuidv4(),
    location_id
  };
  const postOfferParams = {
    TableName: "Offer",
    Item: uploadable
  };
  await db.put(postOfferParams).promise();
  return uploadable;
};

export default PostOfferResolver;
