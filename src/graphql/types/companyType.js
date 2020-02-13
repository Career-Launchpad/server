import { GraphQLObjectType, GraphQLString } from "graphql";

const company = {
  id: { type: GraphQLString },
  name: { type: GraphQLString }
};

const CompanyType = new GraphQLObjectType({
  name: "company",
  fields: () => company
});

export { CompanyType };
