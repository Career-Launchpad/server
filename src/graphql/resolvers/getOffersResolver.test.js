import GetOffersResolver from "./getOffersResolver";

describe("Resolvers", () => {
  it("GetOffersResolver", async () => {
    const offers = [
      {
        offer_id: "1234",
        position_type: "Full-time",
        position_title: "Janitor",
        accepted: true,
        academic_year: "Senior",
        company_name: "Qualtrics",
        flag: true,
        student_id: "My student id",
        location: {
          city: "Provo",
          state: "Utah",
          country: "USA"
        },
        wage_value: 123456,
        wage_type: "salary"
      }
    ];

    const bonuses = [
      {
        value: 20000,
        type: "Free money",
        repeat_count: 5,
        one_time: false,
        description: "Just some free money for the new janitor"
      }
    ];

    const testcases = [
      {
        desc: "should return all offer objects",
        db: {
          scan: jest.fn().mockReturnValue({
            promise: () => {
              return {
                Items: offers
              };
            }
          }),
          query: jest.fn().mockReturnValue({
            promise: () => {
              return {
                Items: bonuses
              };
            }
          })
        },
        expectedDBCalls: {
          scan: { TableName: "OfferDev" },
          query: {
            TableName: "BonusDev",
            KeyConditionExpression: "#i = :id",
            ExpressionAttributeNames: { "#i": "id" },
            ExpressionAttributeValues: {
              ":id": "1234"
            }
          }
        },
        expectedRetValue: {
          edges: [
            {
              ...offers[0],
              bonuses: bonuses
            }
          ]
        }
      }
    ];

    testcases.forEach(
      async ({ db, args, expectedDBCalls, expectedRetValue }, i) => {
        await expect(GetOffersResolver(db, args)).resolves.toEqual(
          expectedRetValue
        );
        Object.keys(expectedDBCalls).forEach(key => {
          const expected = expectedDBCalls[key];
          expect(db[key].mock.calls[0][0]).toEqual(expected);
        });
      }
    );
  });
});
