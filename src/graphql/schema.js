import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLFloat,
  GraphQLInt
} from "graphql";

import { globalIdField, fromGlobalId, nodeDefinitions } from "graphql-relay";

import {
  GetStudentResolver,
  GetStudentsResolver,
  GetOfferResolver,
  GetOffersResolver,
  PostOfferResolver,
  PostStudentResolver
} from "./resolvers";

let Schema = db => {
  const bonus = {
    value: { type: GraphQLFloat },
    type: { type: GraphQLString },
    repeat_interval: { type: GraphQLString },
    repeat_count: { type: GraphQLInt },
    one_time: { type: GraphQLBoolean },
    description: { type: GraphQLString }
  };

  const Bonus = new GraphQLObjectType({
    name: "bonus",
    fields: () => bonus
  });

  const location = {
    city: { type: GraphQLString },
    state: { type: GraphQLString },
    country: { type: GraphQLString }
  };

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

  const Location = new GraphQLObjectType({
    name: "location",
    fields: () => location
  });

  const offer = {
    id: { type: GraphQLString },
    position_type: { type: GraphQLString },
    position_title: { type: GraphQLString },
    accepted: { type: GraphQLBoolean },
    extended: { type: GraphQLInt }, // timestamp
    deadline: { type: GraphQLInt }, // timestamp
    academic_year: { type: GraphQLString },
    company_name: { type: GraphQLString },
    flag: { type: GraphQLBoolean },
    student_id: { type: GraphQLString },
    location: { type: Location },
    wage_value: { type: GraphQLFloat },
    wage_type: { type: GraphQLString },
    bonuses: { type: GraphQLList(Bonus) }
  };

  const LocationInput = new GraphQLInputObjectType({
    name: "locationInput",
    fields: () => location
  });

  const BonusInput = new GraphQLInputObjectType({
    name: "bonusInput",
    fields: () => bonus
  });

  const Offer = new GraphQLObjectType({
    name: "offer",
    fields: () => offer
  });

  const OfferInput = new GraphQLInputObjectType({
    name: "offerInput",
    fields: () => ({
      offer: {
        type: new GraphQLInputObjectType({
          name: "offerInput2",
          fields: () => ({
            student_id: { type: GraphQLString },
            position_type: { type: GraphQLString }, // full-time, part-time, internship, contractor
            position_title: { type: GraphQLString },
            accepted: { type: GraphQLBoolean },
            extended: { type: GraphQLInt }, // timestamp
            deadline: { type: GraphQLInt }, // timestamp
            company_name: { type: GraphQLString },
            location: { type: LocationInput },
            wage_value: { type: GraphQLFloat },
            wage_type: { type: GraphQLString }, // hourly, salary, onetime payment
            bonuses: { type: GraphQLList(BonusInput) }
          })
        })
      }
    })
  });

  const Student = new GraphQLObjectType({
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
        type: GraphQLList(Offer),
        args: { student_id: { type: GraphQLString } },
        resolve(parent, args) {
          console.log(parent);
          console.log(args);
        }
      }
    })
  });

  const StudentInput = new GraphQLInputObjectType({
    name: "studentInput",
    fields: () => student
  });

  const Query = new GraphQLObjectType({
    name: "store",
    fields: () => ({
      id: globalIdField("query"),
      student: {
        type: Student,
        args: {
          id: { type: GraphQLString }
        },
        resolve: async (_, args) => GetStudentResolver(db, args)
      },
      offer: {
        type: Offer,
        args: {
          id: { type: GraphQLString }
        },
        resolve: async (_, args) => GetOfferResolver(db, args)
      },
      offers: {
        type: GraphQLList(Offer),
        resolve: async _ => GetOffersResolver(db)
      },
      students: {
        type: GraphQLList(Student),
        args: {
          gender: { type: GraphQLString }
        },
        resolve: async (_, args) => GetStudentsResolver(db, args)
      }
    })
  });

  const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: "query",
      fields: () => ({
        id: globalIdField("store"),
        store: {
          type: Query,
          resolve: () => Query
        }
      })
    }),
    mutation: new GraphQLObjectType({
      name: "mutation",
      fields: () => ({
        id: globalIdField("mutation"),
        student: {
          type: Student,
          args: {
            student: { type: StudentInput }
          },
          resolve: async (_, args) => PostStudentResolver(db, args)
        },
        offer: {
          type: Offer,
          args: {
            offer: { type: OfferInput }
          },
          resolve: async (_, args) => PostOfferResolver(db, args)
        }
      })
    })
  });

  return schema;
};

export default Schema;
