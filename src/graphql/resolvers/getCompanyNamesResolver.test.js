import GetCompanyNamesResolver from "./getCompanyNamesResolver";
import { TABLES } from "../environment";

const companies = [
  {
    name: "Qualtrics"
  },
  {
    name: "Qualtrics"
  },
  {
    name: "Quizlet"
  },
  {
    name: "Qualtrics"
  },
  {
    name: "Brevium"
  },
  {
    name: "Qualtrics"
  },
  {
    name: "Qualtrics"
  },
  {
    name: "Podium"
  },
  {
    name: "Proofpoint"
  },
  {
    name: "Zebra"
  }
];

const testcases = [
  {
    desc: "should return all company names",
    db: {
      scan: jest.fn().mockReturnValue({
        promise: () => {
          return {
            Items: companies
          };
        }
      })
    },
    expectedDBCalls: {
      scan: { TableName: TABLES.Company }
    },
    expectedRetValue: [
      "Brevium",
      "Podium",
      "Proofpoint",
      "Qualtrics",
      "Quizlet",
      "Zebra"
    ]
  }
];

describe("GetCompanyNamesResolver", () => {
  testcases.forEach(
    async ({ db, expectedDBCalls, expectedRetValue, desc }, i) => {
      it(desc, async () => {
        await expect(GetCompanyNamesResolver(db)).resolves.toEqual(
          expectedRetValue
        );
        Object.keys(expectedDBCalls).forEach(key => {
          const expected = expectedDBCalls[key];
          expect(db[key].mock.calls[0][0]).toEqual(expected);
        });
      });
    }
  );
});
