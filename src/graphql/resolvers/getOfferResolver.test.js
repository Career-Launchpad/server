describe("Resolvers", () => {
  it("GetOfferResolver", async () => {
    // const testcases = [
    //   {
    //     desc: "should return student object with the given args and a uuid",
    //     db: {
    //       put: jest.fn().mockReturnValue({ promise: () => {} })
    //     },
    //     args: {
    //       id: ""
    //     },
    //     expectedDBCall: {
    //       TableName: "Student",
    //       Item: {
    //         firstname: "Braden",
    //         lastname: "Watkins",
    //         id: uuidv4()
    //       }
    //     },
    //     expectedRetValue: {
    //       firstname: "Braden",
    //       lastname: "Watkins",
    //       id: uuidv4()
    //     }
    //   }
    // ];
  });
});

// const testcases = [
//   {
//     desc: "should return student object with the given args and a uuid",
//     db: {
//       put: jest.fn().mockReturnValue({ promise: () => {} })
//     },
//     args: {
//       student: {
//         firstname: "Braden",
//         lastname: "Watkins"
//       }
//     },
//     expectedDBCall: {
//       TableName: "Student",
//       Item: {
//         firstname: "Braden",
//         lastname: "Watkins",
//         id: uuidv4()
//       }
//     },
//     expectedRetValue: {
//       firstname: "Braden",
//       lastname: "Watkins",
//       id: uuidv4()
//     }
//   }
// ];

// testcases.forEach(
//   async ({ db, args, expectedDBCall, expectedRetValue }, i) => {
//     await expect(PostStudentResolver(db, args)).resolves.toEqual(
//       expectedRetValue
//     );
//     expect(db.put.mock.calls[i][0]).toEqual(expectedDBCall);
//   }
// );
