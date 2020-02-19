import PostStudentResolver from "./postStudentResolver";

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
describe("Resolvers", () => {
  testcases.forEach(
    async ({ db, args, desc, expectedDBCall, expectedRetValue }, i) => {
      it(desc, async () => {
        await expect(PostStudentResolver(db, args)).resolves.toEqual(
          expectedRetValue
        );
        expect(db.put.mock.calls[i][0]).toEqual(expectedDBCall);
      });
    }
  );
});
