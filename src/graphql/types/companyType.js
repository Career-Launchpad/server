import { GraphQLObjectType, GraphQLString } from "graphql";

const company = {
  id: { type: GraphQLString },
  name: { type: GraphQLString }
};

const CompanyType = new GraphQLObjectType({
  name: "company",
  fields: () => company
});

const CompanyConnection = new GraphQLObjectType({
  name: "companyConnection",
  fields: () => ({
    edges: { type: GraphQLList(CompanyType) }
  })
});

export { CompanyType, CompanyConnection };
