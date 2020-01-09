import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLList
} from "graphql";
import { globalIdField } from "graphql-relay";
import * as Types from "./types";
import {
  GetStudentResolver,
  GetStudentsResolver,
  GetOfferResolver,
  GetOffersResolver,
  PostOfferResolver,
  PostStudentResolver
} from "./resolvers/resolvers";

let Schema = db => {
  const Query = new GraphQLObjectType({
    name: "store",
    fields: () => ({
      id: globalIdField("query"),
      student: {
        type: Types.StudentType,
        args: {
          id: { type: GraphQLString }
        },
        resolve: async (_, args) => GetStudentResolver(db, args)
      },
      offer: {
        type: Types.OfferType,
        args: {
          id: { type: GraphQLString }
        },
        resolve: async (_, args) => GetOfferResolver(db, args)
      },
      offers: {
        type: Types.OfferConnection,
        resolve: async _ => GetOffersResolver(db)
      },
      students: {
        type: GraphQLList(Types.StudentType),
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
          type: Types.StudentType,
          args: {
            student: { type: Types.CreateStudentInput }
          },
          resolve: async (_, args) => PostStudentResolver(db, args)
        },
        offer: {
          type: Types.OfferType,
          args: {
            offer: { type: Types.CreateOfferInput }
          },
          resolve: async (_, args) => PostOfferResolver(db, args)
        }
      })
    })
  });

  return schema;
};

export default Schema;
