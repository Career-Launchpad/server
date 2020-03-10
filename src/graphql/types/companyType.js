import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt
} from "graphql";

const company = {
  id: { type: GraphQLString },
  name: { type: GraphQLString },
  offersCount: { type: GraphQLInt }
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
