import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLFloat,
  GraphQLInt
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

export { BonusInput, BonusType };
