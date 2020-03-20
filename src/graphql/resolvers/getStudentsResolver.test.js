import GetStudentsResolver from "./getStudentsResolver";
import { TABLES } from "../environment";

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
      TableName: TABLES.Student
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
      TableName: TABLES.Student
    },
    expectedRetValue: { edges: [] }
  }
];

describe("Resolvers", () => {
  testcases.forEach(
    async ({ db, desc, args, expectedDBCall, expectedRetValue }, i) => {
      it(desc, async () => {
        await expect(GetStudentsResolver(db, args)).resolves.toEqual(
          expectedRetValue
        );
        expect(db.scan.mock.calls[0][0]).toEqual(expectedDBCall);
      });
    }
  );
});
