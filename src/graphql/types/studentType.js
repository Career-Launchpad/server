import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInputObjectType
} from "graphql";

import { dynamoDB } from "../index";

import { GetOffersResolver } from "../resolvers";

import { OfferType, OfferConnection } from "./offerType";

const student = {
  id: { type: GraphQLString },
  email: { type: GraphQLString },
  firstname: { type: GraphQLString },
  lastname: { type: GraphQLString },
  college_name: { type: GraphQLString },
  academic_year: { type: GraphQLString },
  major: { type: GraphQLString },
  gender: { type: GraphQLString },
  ethnicity: { type: GraphQLString },
  last_authentication: { type: GraphQLString }
};

const StudentType = new GraphQLObjectType({
  name: "student",
  fields: () => ({
    ...student,
    security_level: { type: GraphQLString },
    offers: {
      type: OfferConnection,
      args: { student_id: { type: GraphQLString } },
      resolve: async (parent, args) => {
        return GetOffersResolver(dynamoDB, {
          ...args,
          filters: [{ field: "student_id", value: parent.id, comp: "=" }]
        });
      }
    }
  })
});

const StudentConnection = new GraphQLObjectType({
  name: "studentConnection",
  fields: () => ({
    edges: { type: GraphQLList(StudentType) }
  })
});

const CreateStudentInput = new GraphQLInputObjectType({
  name: "createStudentInput",
  fields: () => student
});

export { CreateStudentInput, StudentConnection, StudentType };
