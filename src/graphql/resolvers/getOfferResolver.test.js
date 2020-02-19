import GetOfferResolver from "./getOfferResolver";

describe("Resolvers", () => {
  it("GetOfferResolver", async () => {
    const testcases = [
      {
        desc: "should return offer object with the given args and a uuid",
        db: {
          get: jest.fn().mockReturnValue({
            promise: () => {
              return {
                Item: {
                  id: "54321",
                  position_type: "Full-Time",
                  position_title: "Janitor"
                }
              };
            }
          })
        },
        args: {
          id: "54321"
        },
        expectedDBCall: {
          TableName: "OfferDev",
          Key: {
            id: "54321"
          }
        },
        expectedRetValue: {
          id: "54321",
          position_type: "Full-Time",
          position_title: "Janitor"
        }
      },
      {
        desc: "shouldn't return an offer",
        db: {
          get: jest.fn().mockReturnValue({
            promise: () => {
              return {
                Item: null
              };
            }
          })
        },
        args: {
          id: "1423"
        },
        expectedDBCall: {
          TableName: "OfferDev",
          Key: {
            id: "1423"
          }
        },
        expectedRetValue: {}
      }
    ];

    testcases.forEach(
      async ({ db, args, expectedDBCall, expectedRetValue }, i) => {
        await expect(GetOfferResolver(db, args)).resolves.toEqual(
          expectedRetValue
        );
        // Object.keys(expectedDBCall).forEach(key => {
        //   const expected = expectedDBCall[key];
        //   expect(db[key].mock.calls[0][0]).toEqual(expected);
        // });
      }
    );
  });
});
