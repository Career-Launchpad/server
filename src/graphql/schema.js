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
  PostOfferResolver,
  PostStudentResolver
} from "./resolvers";

let Schema = db => {
  // const nodeDefs = nodeDefinitions(
  //   globalId => {
  //     let { type } = fromGlobalId(globalId);
  //     if (type === "store") return store;
  //     return null;
  //   },
  //   obj => {
  //     if (obj instanceof Store) return Store;
  //     return null;
  //   }
  // );

  const bonus = {
    value: { type: GraphQLFloat },
    type: { type: GraphQLString },
    repeat_interval: { type: GraphQLString },
    repeat_count: { type: GraphQLInt },
    immediate: { type: GraphQLBoolean },
    description: { type: GraphQLString }
  };

  const Bonus = new GraphQLObjectType({
    name: "bonus",
    fields: () => bonus
  });

  const compensation = {
    value: { type: GraphQLFloat },
    type: { type: GraphQLString },
    bonuses: { type: GraphQLList(Bonus) }
  };

  const location = {
    city: { type: GraphQLString },
    state: { type: GraphQLString },
    country: { type: GraphQLString }
  };

  const student = {
    id: { type: GraphQLString },
    college_id: { type: GraphQLString },
    major: { type: GraphQLString },
    gender: { type: GraphQLString },
    ethnicity: { type: GraphQLString },
    last_authentication: { type: GraphQLString }
  };

  const Location = new GraphQLObjectType({
    name: "location",
    fields: () => location
  });

  const Compensation = new GraphQLObjectType({
    name: "compensation",
    fields: () => compensation
  });

  const offer = {
    id: { type: GraphQLString },
    type: { type: GraphQLString },
    accepted: { type: GraphQLBoolean },
    company_id: { type: GraphQLString },
    flag: { type: GraphQLBoolean },
    student_id: { type: GraphQLString },
    location: { type: Location },
    compensation: { type: Compensation }
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

  const CompensationInput = new GraphQLInputObjectType({
    name: "compensationInput",
    fields: () => ({
      value: { type: GraphQLFloat },
      type: { type: GraphQLString },
      bonuses: { type: GraphQLList(BonusInput) }
    })
  });

  const OfferInput = new GraphQLInputObjectType({
    name: "offerInput",
    fields: () => ({
      id: { type: GraphQLString },
      offer: {
        type: new GraphQLInputObjectType({
          name: "offerInput2",
          fields: () => ({
            id: { type: GraphQLString },
            type: { type: GraphQLString },
            accepted: { type: GraphQLBoolean },
            company_id: { type: GraphQLString },
            flag: { type: GraphQLBoolean },
            student_id: { type: GraphQLString },
            location: { type: LocationInput },
            compensation: { type: CompensationInput }
          })
        })
      }
    })
  });

  const Student = new GraphQLObjectType({
    name: "student",
    fields: () => ({
      id: { type: GraphQLString },
      college_id: { type: GraphQLString },
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
      students: {
        type: GraphQLList(Student),
        args: {
          gender: { type: GraphQLString }
        },
        resolve: async (_, args) => GetStudentsResolver(db, args)
      }
    })
    // interfaces: [nodeDefs.nodeInterface]
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
