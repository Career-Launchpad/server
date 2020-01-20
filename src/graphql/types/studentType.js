import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInputObjectType
} from "graphql";

import { OfferType } from "./offerType";

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

export { CreateStudentInput, StudentType };
