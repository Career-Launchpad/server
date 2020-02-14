import GetMajorsResolver from "./getMajorsResolver";
import { TABLES } from "../environment";

const students = [
  {
    major: "Computer Science"
  },
  {
    major: "Electrical Engineering"
  }
];

const majors = ["Computer Science", "Electrical Engineering"];

const testcases = [
  {
    desc: "should return all majors",
    db: {
      scan: jest.fn().mockReturnValue({
        promise: () => {
          return {
            Items: students
          };
        }
      })
    },
    expectedDBCalls: {
      scan: { TableName: TABLES.Student }
    },
    expectedRetValue: majors
  },
  {
    desc: "should return empty array",
    db: {
      scan: jest.fn().mockReturnValue({
        promise: () => {
          return {
            Items: null
          };
        }
      })
    },
    expectedDBCalls: {
      scan: { TableName: TABLES.Student }
    },
    expectedRetValue: []
  }
];

describe("GetMajorsResolver", () => {
  testcases.forEach(
    async ({ db, expectedDBCalls, expectedRetValue, desc }, i) => {
      it(desc, async () => {
        await expect(GetMajorsResolver(db)).resolves.toEqual(expectedRetValue);
        Object.keys(expectedDBCalls).forEach(key => {
          const expected = expectedDBCalls[key];
          expect(db[key].mock.calls[0][0]).toEqual(expected);
        });
      });
    }
  );
});
