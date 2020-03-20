import { TABLES } from "../environment";

/*
 * Returns a sorted list of all company_names that have appeared in submitted
 * offers
 */

const GetCompanyNamesResolver = async db => {
  const params = {
    TableName: TABLES.Company
  };
  let companies = await db.scan(params).promise();
  return (companies.Items || [])
    .map(company => company.name)
    .reduce((acc, name) => {
      if (!acc.includes(name)) {
        acc.push(name);
      }
      return acc;
    }, [])
    .sort();
};

export default GetCompanyNamesResolver;
