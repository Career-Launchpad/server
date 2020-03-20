import GetOfferResolver from "./getOfferResolver";
import { TABLES } from "../environment";

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
      get: {
        TableName: TABLES.Offer,
        Key: {
          id: "54321"
        }
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
      get: {
        TableName: TABLES.Offer,
        Key: {
          id: "1423"
        }
      }
    },
    expectedRetValue: {}
  }
];

describe("Resolvers", () => {
  testcases.forEach(
    async ({ db, args, desc, expectedDBCall, expectedRetValue }, i) => {
      it(desc, async () => {
        await expect(GetOfferResolver(db, args)).resolves.toEqual(
          expectedRetValue
        );
        Object.keys(expectedDBCall).forEach(key => {
          const expected = expectedDBCall[key];
          expect(db[key].mock.calls[0][0]).toEqual(expected);
        });
      });
    }
  );
});
