import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLFloat,
  GraphQLInt,
  GraphQLList
} from "graphql";

const bonus = {
  value: { type: GraphQLFloat },
  type: { type: GraphQLString },
  repeat_interval: { type: GraphQLString },
  repeat_count: { type: GraphQLInt },
  one_time: { type: GraphQLBoolean },
  description: { type: GraphQLString }
};

const BonusType = new GraphQLObjectType({
  name: "bonus",
  fields: () => bonus
});

const BonusInput = new GraphQLInputObjectType({
  name: "bonusInput",
  fields: () => bonus
});

const BonusConnection = new GraphQLObjectType({
  name: "bonusConnection",
  fields: () => ({
    edges: { type: GraphQLList(BonusType) }
  })
});

export { BonusInput, BonusType, BonusConnection };
