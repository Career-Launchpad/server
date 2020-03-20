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
    wage_type: "salary",
    bonuses: [
      {
        value: 20000,
        type: "Free money",
        repeat_count: 5,
        one_time: false,
        description: "Just some free money for the new janitor"
      }
    ]
  }
];

const testcases = [
  {
    desc: "should return all offer objects",
    db: {
      scan: jest.fn().mockReturnValue({
        promise: () => ({ Items: offers })
      })
    },
    args: {
      filters: null
    },
    expectedDBCalls: {
      scan: { TableName: "OfferDev" }
    },
    expectedRetValue: {
      edges: [...offers]
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
