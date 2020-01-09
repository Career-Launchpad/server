import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLFloat,
  GraphQLInt
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

const offer = {
  id: { type: GraphQLString },
  position_type: { type: GraphQLString },
  position_title: { type: GraphQLString },
  accepted: { type: GraphQLBoolean },
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

const student = {
  email: { type: GraphQLString },
  firstname: { type: GraphQLString },
  lastname: { type: GraphQLString },
  college_id: { type: GraphQLString },
  academic_year: { type: GraphQLString },
  major: { type: GraphQLString },
  gender: { type: GraphQLString },
  ethnicity: { type: GraphQLString },
  last_authentication: { type: GraphQLString }
};

const StudentType = new GraphQLObjectType({
  name: "student",
  fields: () => ({
    id: { type: GraphQLString },
    email: { type: GraphQLString },
    firstname: { type: GraphQLString },
    lastname: { type: GraphQLString },
    college_name: { type: GraphQLString },
    academic_year: { type: GraphQLString },
    major: { type: GraphQLString },
    gender: { type: GraphQLString },
    last_authentication: { type: GraphQLString },
    security_level: { type: GraphQLString },
    ethnicity: { type: GraphQLString },
    offers: {
      type: GraphQLList(OfferType),
      args: { student_id: { type: GraphQLString } },
      resolve(parent, args) {
        //   TODO: Create Resolver
        console.log(parent);
        console.log(args);
      }
    }
  })
});

const CreateStudentInput = new GraphQLInputObjectType({
  name: "createStudentInput",
  fields: () => student
});

export default {
  BonusInput,
  BonusType,
  CreateOfferInput,
  CreateOfferInput,
  CreateStudentInput,
  LocationInput,
  LocationType,
  OfferConnection,
  OfferType,
  StudentType
};
