import PostOfferResolver from "./postOfferResolver";

describe("Resolvers", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  it("PostOfferResolver", async () => {
    const testValues = [
      {
        offer: {
          position_type: "Part-Time",
          position_title: "King",
          accepted: true,
          academic_year: "Senior",
          company_name: "test",
          flag: false,
          student_id: "mylord",
          wage_value: 1
        },
        location: {
          city: "London",
          state: "State",
          country: "England"
        },
        bonuses: [
          {
            value: 12345,
            type: "",
            one_time: true,
            description: "A really cool bonus"
          }
        ],
        location_id: "LondonStateEngland".replace(/\s/g, "")
      }
    ];
    const testcases = [
      {
        desc:
          "should post an offer and the new company object with the given args",
        db: {
          put: jest.fn().mockReturnValue({
            promise: () => {
              return { Items: [{ name: "test" }] };
            }
          }),
          // query location
          query: jest.fn().mockReturnValue({
            promise: () => {
              return {
                Items: []
              };
            }
          })
        },
        args: {
          offer: {
            ...testValues[0].offer,
            location: testValues[0].location,
            bonuses: testValues[0].bonuses
          }
        },
        expectedRetValue: {
          ...testValues[0].offer,
          offer_id: 123456789,
          location_id: testValues[0].location_id
        }
      },
      {
        desc:
          "should post an offer object with the given args but not post the company object",
        db: {
          put: jest.fn().mockReturnValue({
            promise: () => {
              return { Items: [{ name: "" }] };
            }
          }),
          // query location
          query: jest.fn().mockReturnValue({
            promise: () => {
              return {
                Items: [
                  {
                    id: "coolcompanyid",
                    name: "test"
                  }
                ]
              };
            }
          })
        },
        args: {
          offer: {
            ...testValues[0].offer,
            location: testValues[0].location
          }
        },
        expectedRetValue: {
          ...testValues[0].offer,
          offer_id: 123456789,
          location_id: testValues[0].location_id
        }
      },
      {
        desc: "should catch an error thrown",
        db: {
          query: jest.fn().mockImplementation(() => {
            throw new Error("I broke");
          })
        },
        args: {
          offer: {
            ...testValues[0].offer
          }
        },
        expectedRetValue: {}
      }
    ];

    testcases.forEach(async ({ db, args, expectedRetValue }, i) => {
      await expect(PostOfferResolver(db, args)).resolves.toEqual(
        expect.objectContaining(expectedRetValue)
      );
    });
  });
});
