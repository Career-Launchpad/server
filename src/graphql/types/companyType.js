import { GraphQLObjectType, GraphQLString, GraphQLList } from "graphql";
import { OfferConnection } from "./offerType";
import { GetCompaniesOffersResolver } from "../resolvers";
import { dynamoDB } from "../index";

const company = {
  id: { type: GraphQLString },
  name: { type: GraphQLString }
};

const CompanyType = new GraphQLObjectType({
  name: "company",
  fields: () => ({
    ...company,
    offers: {
      type: OfferConnection,
      args: { company_id: { type: GraphQLString } },
      resolve: async (parent, args) => {
        return GetCompaniesOffersResolver(dynamoDB, {
          ...args,
          filters: [{ field: "company_id", value: parent.id, comp: "=" }]
        });
      }
    }
  })
});

const CompanyConnection = new GraphQLObjectType({
  name: "companyConnection",
  fields: () => ({
    edges: { type: GraphQLList(CompanyType) }
  })
});

export { CompanyType, CompanyConnection };
