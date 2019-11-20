import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID
} from "graphql";

import { globalIdField, fromGlobalId, nodeDefinitions } from "graphql-relay";

import { StudentResolver } from "./resolvers";

let Schema = db => {
  const nodeDefs = nodeDefinitions(
    globalId => {
      let { type } = fromGlobalId(globalId);
      if (type === "store") return store;
      return null;
    },
    obj => {
      if (obj instanceof Store) return Store;
      return null;
    }
  );

  const Student = new GraphQLObjectType({
    name: "student",
    fields: () => ({
      id: { type: GraphQLID },
      college_id: { type: GraphQLID },
      major: { type: GraphQLString },
      gender: { type: GraphQLString },
      ethnicity: { type: GraphQLString }
      // offers: {
      //   type: GraphQLList(Offer),
      //   args: { id: { type: GraphQLID } },
      //   resolve(parent, args) {
      //     console.log(parent);
      //     console.log(args);
      //   }
      // },
    })
  });

  const Store = new GraphQLObjectType({
    name: "store",
    fields: () => ({
      id: globalIdField("store"),
      student: {
        type: Student,
        args: {
          user_id: { type: GraphQLString }
        },
        resolve: async (_, args) => StudentResolver(db, args)
      }
    }),
    interfaces: [nodeDefs.nodeInterface]
  });

  const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: "query",
      fields: () => ({
        node: nodeDefs.nodeField,
        store: {
          type: Store,
          resolve: () => Store
        }
      })
    })
  });

  return schema;
};

export default Schema;
