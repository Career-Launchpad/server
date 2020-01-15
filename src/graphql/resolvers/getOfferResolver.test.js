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
                  offer_id: "54321",
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
          TableName: "Offer",
          Key: {
            offer_id: "54321"
          }
        },
        expectedRetValue: {
          offer_id: "54321",
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
          TableName: "Offer",
          Key: {
            offer_id: "1423"
          }
        },
        expectedRetValue: {
          offer_id: "1423"
        }
      }
    ];

    testcases.forEach(
      async ({ db, args, expectedDBCall, expectedRetValue }, i) => {
        await expect(GetOfferResolver(db, args)).resolves.toEqual(
          expectedRetValue
        );
        expect(db.get.mock.calls[0][0]).toEqual(expectedDBCall);
      }
    );
  });
});
