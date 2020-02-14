import PostStudentResolver from "./postStudentResolver";

describe("Resolvers", () => {
  it("PostStudentResolver", async () => {
    const testcases = [
      {
        desc: "should return student object with the given args and a uuid",
        db: {
          put: jest.fn().mockReturnValue({ promise: () => {} })
        },
        args: {
          student: {
            id: "thisisauniqueid",
            firstname: "Braden",
            lastname: "Watkins"
          }
        },
        expectedDBCall: {
          TableName: "StudentDev",
          Item: {
            id: "thisisauniqueid",
            firstname: "Braden",
            lastname: "Watkins"
          }
        },
        expectedRetValue: {
          id: "thisisauniqueid",
          firstname: "Braden",
          lastname: "Watkins"
        }
      }
    ];

    testcases.forEach(
      async ({ db, args, expectedDBCall, expectedRetValue }, i) => {
        await expect(PostStudentResolver(db, args)).resolves.toEqual(
          expectedRetValue
        );
        expect(db.put.mock.calls[i][0]).toEqual(expectedDBCall);
      }
    );
  });
});
