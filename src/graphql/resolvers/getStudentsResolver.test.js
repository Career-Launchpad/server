import GetStudentsResolver from "./getStudentsResolver";

describe("Resolvers", () => {
  it("GetStudentsResolver", async () => {
    const students = [
      {
        email: "studentemail@test.com",
        firstname: "Johnny",
        lastname: "Student",
        college_id: "BYUID",
        academic_year: "Junior",
        major: "Chemical Engineering"
      }
    ];

    const testcases = [
      {
        desc: "should return all students",
        db: {
          scan: jest.fn().mockReturnValue({
            promise: () => {
              return {
                Items: students
              };
            }
          })
        },
        args: {
          filters: null
        },
        expectedDBCall: {
          TableName: "StudentDev"
        },
        expectedRetValue: { edges: students }
      },
      {
        desc: "shouldn't return students",
        db: {
          scan: jest.fn().mockReturnValue({
            promise: () => {
              return {
                Items: null
              };
            }
          })
        },
        args: {
          filters: null
        },
        expectedDBCall: {
          TableName: "StudentDev"
        },
        expectedRetValue: { edges: [] }
      }
    ];

    testcases.forEach(
      async ({ db, args, expectedDBCall, expectedRetValue }, i) => {
        await expect(GetStudentsResolver(db, args)).resolves.toEqual(
          expectedRetValue
        );
        expect(db.scan.mock.calls[0][0]).toEqual(expectedDBCall);
      }
    );
  });
});
