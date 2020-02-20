import GetOffersResolver from "./getOffersResolver";

const offers = [
  {
    id: "1234",
    position_type: "Full-time",
    position_title: "Janitor",
    accepted: true,
    academic_year: "Senior",
    company: {
      id: "4312",
      name: "Qualtrics"
    },
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

const company = {
  id: "4312",
  name: "Qualtrics"
};

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
      }),
      get: jest.fn().mockReturnValue({
        promise: () => {
          return {
            Item: company
          };
        }
      })
    },
    args: {
      filters: null
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

describe("Resolvers", () => {
  testcases.forEach(
    async ({ db, desc, args, expectedDBCalls, expectedRetValue }, i) => {
      it(desc, async () => {
        await expect(GetOffersResolver(db, args)).resolves.toEqual(
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
