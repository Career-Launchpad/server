import GetCompanyNamesResolver from "./getCompanyNamesResolver";
import { TABLES } from "../environment";

const offers = [
  {
    company_name: "Qualtrics"
  },
  {
    company_name: "Qualtrics"
  },
  {
    company_name: "Quizlet"
  },
  {
    company_name: "Qualtrics"
  },
  {
    company_name: "Brevium"
  },
  {
    company_name: "Qualtrics"
  },
  {
    company_name: "Qualtrics"
  },
  {
    company_name: "Podium"
  },
  {
    company_name: "Proofpoint"
  },
  {
    company_name: "Zebra"
  }
];

const testcases = [
  {
    desc: "should return all company names",
    db: {
      scan: jest.fn().mockReturnValue({
        promise: () => {
          return {
            Items: offers
          };
        }
      })
    },
    expectedDBCalls: {
      scan: { TableName: TABLES.Offer }
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
