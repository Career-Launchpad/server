import GetCompaniesResolver from "./getCompaniesResolver";
import { TABLES } from "../environment";

const companies = [
  {
    company_name: "Qualtrics",
    id: "1"
  },
  {
    company_name: "Quizlet",
    id: "2"
  },
  {
    company_name: "Brevium",
    id: "3"
  },
  {
    company_name: "Podium",
    id: "4"
  },
  {
    company_name: "Proofpoint",
    id: "5"
  },
  {
    company_name: "Zebra",
    id: "6"
  }
];

const testcases = [
  {
    desc: "should return all companies",
    db: {
      scan: jest.fn().mockReturnValue({
        promise: () => {
          return {
            Items: companies
          };
        }
      })
    },
    args: {
      filters: null
    },
    expectedDBCalls: {
      scan: { TableName: TABLES.Company }
    },
    expectedRetValue: { edges: companies }
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
    args: {
      filters: null
    },
    expectedDBCalls: {
      scan: { TableName: TABLES.Company }
    },
    expectedRetValue: { edges: [] }
  }
];

describe("GetCompaniesResolver", () => {
  testcases.forEach(
    async ({ db, args, expectedDBCalls, expectedRetValue, desc }, i) => {
      it(desc, async () => {
        await expect(GetCompaniesResolver(db, args)).resolves.toEqual(
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
