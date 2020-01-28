import uuidv4 from "uuid/v4";
import removeEmptyStrings from "../utils/removeEmptyStrings";

const putCompany = async (db, company_name) => {
  const id = uuidv4();
  const name = company_name;
  let addCompanyParams = {
    TableName: "Company",
    Item: { id, name }
  };
  await db.put(addCompanyParams).promise();
  return { id, name };
};

const queryCompany = async (db, company_name) => {
  const companyParams = {
    TableName: "Company",
    IndexName: "name-index",
    KeyConditionExpression: "#nm = :name",
    ExpressionAttributeNames: {
      "#nm": "name"
    },
    ExpressionAttributeValues: {
      ":name": company_name
    }
  };
  const { Items } = await db.query(companyParams).promise();
  if (Items.length === 0) {
    return await putCompany(db, company_name);
  }
  return {
    id: Items[0].id,
    name: Items[0].name
  };
};

const putLocation = async (db, location) => {
  const { city, state, country } = location;
  const location_id = `${city}${state}${country}`.replace(/\s/g, "");
  const locationParams = {
    TableName: "Location",
    Item: { location_id, ...location }
  };

  await db.put(locationParams).promise();

  return location_id;
};

const putBonuses = async (db, bonuses, company_id) => {
  if (bonuses) {
    for await (let bonus of bonuses) {
      const postBonusParams = {
        TableName: "Bonus",
        Item: {
          id: company_id,
          ...removeEmptyStrings(bonus)
        }
      };
      await db.put(postBonusParams).promise();
    }
  }
};

const PostOfferResolver = async (db, args) => {
  try {
    const company = await queryCompany(db, args.offer.company_name);
    const location_id = await putLocation(db, args.offer.location);
    await putBonuses(db, args.offer.bonuses, company.id);

    delete args.offer.bonuses;
    delete args.offer.location;

    let uploadable = {
      ...removeEmptyStrings(args.offer),
      location_id,
      offer_id: uuidv4(),
      company_name: company.name,
      timestamp: new Date().getTime()
    };

    const postOfferParams = {
      TableName: "Offer",
      Item: uploadable
    };

    await db.put(postOfferParams).promise();
    return {
      ...removeEmptyStrings(uploadable),
      offer_id: uploadable.offer_id
    };
  } catch (err) {
    console.error(err);
    return {};
  }
};

export default PostOfferResolver;
