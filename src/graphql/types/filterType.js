import { GraphQLString, GraphQLList, GraphQLInputObjectType } from "graphql";

const filter = {
  field: { type: GraphQLString },
  value: { type: GraphQLString },
  comp: { type: GraphQLString },
  parseValueAs: { type: GraphQLString }
};

const FilterType = new GraphQLInputObjectType({
  name: "filter",
  fields: () => filter
});

const Filters = new GraphQLInputObjectType({
  name: "filters",
  fields: () => GraphQLList(FilterType)
});

export { FilterType, Filters };
