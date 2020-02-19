import { globalIdField } from "graphql-relay";
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLList
} from "graphql";

import {
  StudentType,
  OfferConnection,
  StudentConnection,
  OfferType,
  CreateStudentInput,
  CreateOfferInput,
  CompanyType,
  CompanyConnection,
  LocationConnection,
  BonusConnection
} from "./types";

import {
  GetStudentResolver,
  GetStudentsResolver,
  GetOfferResolver,
  GetOffersResolver,
  PostOfferResolver,
  PostStudentResolver,
  GetCompanyNamesResolver,
  GetCompaniesResolver,
  GetCompanyResolver,
  GetMajorsResolver
} from "./resolvers";

let Schema = db => {
  const QueryType = new GraphQLObjectType({
    name: "store",
    fields: () => ({
      id: globalIdField("query"),
      student: {
        type: StudentType,
        args: {
          id: { type: GraphQLString }
        },
        resolve: async (_, args) => GetStudentResolver(db, args)
      },
      offer: {
        type: OfferType,
        args: {
          id: { type: GraphQLString }
        },
        resolve: async (_, args) => GetOfferResolver(db, args)
      },
      offers: {
        type: OfferConnection,
        resolve: async _ => GetOffersResolver(db)
      },
      students: {
        type: StudentConnection,
        args: {
          gender: { type: GraphQLString }
        },
        resolve: async (_, args) => GetStudentsResolver(db, args)
      },
      company_names: {
        type: GraphQLList(GraphQLString),
        resolve: async _ => GetCompanyNamesResolver(db)
      },
      companies: {
        type: CompanyConnection,
        resolve: async (_, args) => GetCompaniesResolver(db, args)
      },
      company: {
        type: CompanyType,
        args: {
          id: { type: GraphQLString }
        },
        resolve: async (_, args) => GetCompanyResolver(db, args)
      },
      majors: {
        type: GraphQLList(GraphQLString),
        resolve: async (_, args) => GetMajorsResolver(db, args)
      }
    })
  });

  const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: "query",
      fields: () => ({
        id: globalIdField("store"),
        store: {
          type: QueryType,
          resolve: () => QueryType
        }
      })
    }),
    mutation: new GraphQLObjectType({
      name: "mutation",
      fields: () => ({
        id: globalIdField("mutation"),
        student: {
          type: StudentType,
          args: {
            student: { type: CreateStudentInput }
          },
          resolve: async (_, args) => PostStudentResolver(db, args)
        },
        offer: {
          type: OfferType,
          args: {
            offer: { type: CreateOfferInput }
          },
          resolve: async (_, args) => PostOfferResolver(db, args)
        }
      })
    })
  });

  return schema;
};

export default Schema;
