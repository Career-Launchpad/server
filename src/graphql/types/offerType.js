import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLFloat
} from "graphql";

import { BonusType, BonusInput } from "./bonusType";
import { LocationType, LocationInput } from "./locationType";

const offer = {
  id: { type: GraphQLString },
  position_type: { type: GraphQLString },
  position_title: { type: GraphQLString },
  accepted: { type: GraphQLBoolean },
  benefits_description: { type: GraphQLString },
  extended: { type: GraphQLString },
  deadline: { type: GraphQLString },
  academic_year: { type: GraphQLString },
  company_name: { type: GraphQLString },
  flag: { type: GraphQLBoolean },
  student_id: { type: GraphQLString },
  location: { type: LocationType },
  wage_value: { type: GraphQLFloat },
  wage_type: { type: GraphQLString },
  bonuses: { type: GraphQLList(BonusType) }
};

const OfferType = new GraphQLObjectType({
  name: "offer",
  fields: () => offer
});

const OfferConnection = new GraphQLObjectType({
  name: "offerConnection",
  fields: () => ({
    edges: { type: GraphQLList(OfferType) }
  })
});

const CreateOfferInput = new GraphQLInputObjectType({
  name: "createOfferInput",
  fields: () => ({
    student_id: { type: GraphQLString },
    position_type: { type: GraphQLString }, // full-time, part-time, internship, contractor
    position_title: { type: GraphQLString },
    benefits_description: { type: GraphQLString },
    accepted: { type: GraphQLBoolean },
    extended: { type: GraphQLString },
    deadline: { type: GraphQLString },
    company_name: { type: GraphQLString },
    location: { type: LocationInput },
    wage_value: { type: GraphQLFloat },
    wage_type: { type: GraphQLString }, // hourly, salary, onetime payment
    bonuses: { type: GraphQLList(BonusInput) }
  })
});

export { OfferType, OfferConnection, CreateOfferInput };
