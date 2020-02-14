import { TABLES } from "../environment";

/*
 * Returns a list of companies
 */

const GetCompaniesResolver = async (db, args) => {
  const params = {
    TableName: TABLES.Company
  };
  let companies = await db.scan(params).promise();
  return companies.Items || [];
};

export default GetCompaniesResolver;
