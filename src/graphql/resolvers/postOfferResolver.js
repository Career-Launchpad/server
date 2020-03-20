import uuidv4 from "uuid/v4";
import removeEmptyStrings from "../utils/removeEmptyStrings";
import { dbScan } from "./resolverHelper";
import { TABLES } from "../environment";

const putCompany = async (db, company_name) => {
  const id = uuidv4();
  const name = company_name;
  let addCompanyParams = {
    TableName: TABLES.Company,
    Item: { id, name }
  };
  await db.put(addCompanyParams).promise();
  return { id, name };
};

const queryCompany = async (db, company_name) => {
  let companies = await dbScan(db, TABLES.Company, [
    { field: "name", comp: "=", value: company_name }
  ]);
  if (companies.length === 0) {
    return await putCompany(db, company_name);
  }
  const [company] = companies;
  return company;
};

const putLocation = async (db, location) => {
  const { city, state, country } = location;
  const location_id = `${city}${state}${country}`.replace(/\s/g, "");
  const locationParams = {
    TableName: TABLES.Location,
    Item: { location_id, ...location }
  };

  await db.put(locationParams).promise();

  return location_id;
};

const PostOfferResolver = async (db, args) => {
  try {
    const company = await queryCompany(db, args.offer.company_name);
    const location_id = await putLocation(db, args.offer.location);

    delete args.offer.company_name;
    delete args.offer.location;

    let uploadable = {
      ...removeEmptyStrings(args.offer),
      location_id,
      id: uuidv4(),
      company,
      timestamp: new Date().getTime()
    };

    const postOfferParams = {
      TableName: TABLES.Offer,
      Item: uploadable
    };

    await db.put(postOfferParams).promise();
    return {
      ...removeEmptyStrings(uploadable),
      id: uploadable.id
    };
  } catch (err) {
    console.error(err);
    return {};
  }
};

export default PostOfferResolver;
