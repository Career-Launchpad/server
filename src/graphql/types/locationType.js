import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInputObjectType
} from "graphql";

const location = {
  city: { type: GraphQLString },
  state: { type: GraphQLString },
  country: { type: GraphQLString }
};

const LocationType = new GraphQLObjectType({
  name: "location",
  fields: () => location
});

const LocationInput = new GraphQLInputObjectType({
  name: "locationInput",
  fields: () => location
});

export { LocationInput, LocationType };
