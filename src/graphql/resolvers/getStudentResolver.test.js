import GetStudentResolver from "./getStudentResolver";

describe("Resolvers", () => {
  it("GetStudentResolver", async () => {});
});

const testcases = [
  {
    desc: "should return student object with the given args and a uuid",
    db: {
      get: jest.fn().mockReturnValue({
        promise: () => {
          return {
            Item: {
              id: "132",
              email: "test@test.com",
              firstname: "John",
              lastname: "JingleheimerSchmidt",
              college_id: "LDSBC",
              academic_year: "Freshman",
              major: "Piano Performance",
              gender: "Male"
            }
          };
        }
      })
    },
    args: {
      id: "132"
    },
    expectedDBCall: {
      TableName: "Student",
      Key: {
        id: "132"
      }
    },
    expectedRetValue: {
      id: "132",
      email: "test@test.com",
      firstname: "John",
      lastname: "JingleheimerSchmidt",
      college_id: "LDSBC",
      academic_year: "Freshman",
      major: "Piano Performance",
      gender: "Male"
    }
  },
  {
    desc: "should return input id (student not found)",
    db: {
      get: jest.fn().mockReturnValue({
        promise: () => {
          return {
            Item: null
          };
        }
      })
    },
    args: {
      id: "12"
    },
    expectedDBCall: {
      TableName: "Student",
      Key: {
        id: "12"
      }
    },
    expectedRetValue: {
      id: "12"
    }
  }
];

testcases.forEach(async ({ db, args, expectedDBCall, expectedRetValue }, i) => {
  await expect(GetStudentResolver(db, args)).resolves.toEqual(expectedRetValue);
  expect(db.get.mock.calls[0][0]).toEqual(expectedDBCall);
});
