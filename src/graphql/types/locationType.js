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

const LocationConnection = new GraphQLObjectType({
  name: "locationConnection",
  fields: () => ({
    edges: { type: GraphQLList(LocationConnection) }
  })
});

export { LocationInput, LocationType, LocationConnection };
