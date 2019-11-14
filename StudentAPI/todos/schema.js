const graphql = require("graphql");
const resolver = require("./resolvers")
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLInputObjectType
} = graphql;

const BonusType = new GraphQLObjectType({
    name: 'bonus',
    fields: () => ({
        id: { type: GraphQLID },
        value: { type: GraphQLFloat },
        type: { type: GraphQLString },
        repeatInterval: { type: GraphQLString },
        repeatCount: { type: GraphQLInt },
        immediate: { type: GraphQLBoolean }
    })
});

const CompensationType = new GraphQLObjectType({
    name: 'compensation',
    fields: () => ({
        id: { type: GraphQLID },
        value: { type: GraphQLInt },
        type: { type: GraphQLString },
        bonuses: { 
            type: GraphQLList(BonusType),
            args: { id: { type: GraphQLID }},
            resolve(parent, args) {
              console.log(parent);
              console.log(args);
            //   get offers with parentID == student_id
          }
        }
    })
});

const OfferType = new GraphQLObjectType({
    name: "offer",
    fields: () => ({
      id: { type: GraphQLID },
      type: { type: GraphQLString },
      accepted: { type: GraphQLBoolean },
      company_id: { type: GraphQLID },
      location: { type: GraphQLString },
      compensations: { 
          type: GraphQLList(CompensationType),
          args: { id: { type: GraphQLID }},
          resolve(parent, args) {
              console.log(parent);
              console.log(args);
            //   get offers with parentID == student_id
          }
        }
    })
  });

const StudentType = new GraphQLObjectType({
    name: "student",
    fields: () => ({
      student_id: { type: GraphQLID },
      college_id: { type: GraphQLID },
      major: { type: GraphQLString },
      gender: { type: GraphQLString },
      ethnicity: { type: GraphQLString },
      offers: { 
          type: GraphQLList(OfferType),
          args: { id: { type: GraphQLID }},
          resolve(parent, args) {
              console.log(parent);
              console.log(args);
            //   get offers with parentID == student_id
          }
        },
    })
});

const VisualizationType = new GraphQLObjectType({
    name: 'visualization',
    fields: () => ({
        id: { type: GraphQLID },
        histogram: { 
            type: GraphQLString,
            args: { filters: { type: GraphQLString } },
            resolve(parent, args) {
                // get histogram
                console.log(parent);
                console.log(args);
                resolver.histogramResolver(parent.args.filters);
            }
        },
        map: { 
          type: GraphQLString,
          args: { filters: { type: GraphQLString } },
            resolve(parent, args) {
                // get histogram
                console.log(parent);
                console.log(args);
                resolver.mapResolver(parent.args.filters);
            }
        },
        barChart: { 
          type: GraphQLString,
          args: { filters: { type: GraphQLString } },
          resolve(parent, args) {
              // get histogram
              console.log(parent);
              console.log(args);
              resolver.barChartResolver(parent.args.filters);
          }
        },
    })
})


const RootQuery = new GraphQLObjectType({
name: "RootQueryType",
fields: {
    student: {
        type: StudentType,
        args: { id: { type: GraphQLID } },
        resolve(parent, args) {
            // get student offers from db
            resolver.studentResolver(args.id);
        }
    },
    visualizations: {
        type: VisualizationType,
        args: { filters: { type: GraphQLString } },
        resolve(parent, args) {
            console.log(parent);
            console.log(args);
            // resolver.visualizationResolver(args.filters);
        }
    },
    admin: {
        type: GraphQLString,
        // resolve(parent, args){
        //     console.log(parent);
        //     console.log(args);
        // }
    },
}
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
