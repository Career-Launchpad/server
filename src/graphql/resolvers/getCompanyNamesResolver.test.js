import GetCompanyNamesResolver from "./getCompanyNamesResolver";

describe("Resolvers", () => {
  it("GetCompanyNamesResolver", async () => {
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
          scan: { TableName: "Offer" }
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

    testcases.forEach(async ({ db, expectedDBCalls, expectedRetValue }, i) => {
      await expect(GetCompanyNamesResolver(db)).resolves.toEqual(
        expectedRetValue
      );
      Object.keys(expectedDBCalls).forEach(key => {
        const expected = expectedDBCalls[key];
        expect(db[key].mock.calls[0][0]).toEqual(expected);
      });
    });
  });
});
