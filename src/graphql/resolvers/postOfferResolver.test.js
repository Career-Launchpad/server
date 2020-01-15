import PostOfferResolver from "./postOfferResolver";

describe("Resolvers", () => {
  it("PostOfferResolver", async () => {});
});

const uuidv4 = require("uuid/v4");

const timestamp = 1557831718135;

const testValues = [
  {
    offer: {
      position_type: "Part-Time",
      position_title: "King",
      accepted: true,
      academic_year: "Senior",
      company_name: "England",
      flag: false,
      student_id: "mylord",
      wage_value: 1
    },
    location: {
      city: "London",
      state: "State",
      country: "England"
    },
    bonuses: [],
    location_id: "LondonStateEngland".replace(/\s/g, "")
  }
];

const uuid = "someid";

const testcases = [
  {
    desc: "should post an offer object with the given args and a uuid",
    db: {
      put: jest.fn().mockReturnValue({ promise: () => {} }),
      query: jest.fn().mockReturnValue({
        promise: () => {
          return {
            Items: [
              {
                id: uuid,
                name: "England"
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
    expectedDBCalls: [
      {
        // Put location
        operation: "put",
        TableName: "Location",
        Item: {
          location_id: testValues[0].location_id,
          ...testValues[0].location
        }
      },
      {
        // query company
        operation: "query",
        TableName: "Company",
        IndexName: "name-index",
        KeyConditionExpression: "#nm = :name",
        ExpressionAttributeNames: {
          "#nm": "name"
        },
        ExpressionAttributeValues: {
          ":name": testValues[0].offer.company_name
        }
      },
      {
        // put company if doesn't exist
        operation: "put",
        TableName: "Company",
        Item: { id: uuid, name: testValues[0].offer.company_name }
      },
      {
        // put bonuses
        operation: "put",
        TableName: "Bonus",
        Item: {
          id: uuid,
          ...testValues[0].bonuses[0]
        }
      },
      {
        // put offer
        operation: "put",
        TableName: "Offer",
        Item: {
          ...testValues[0].offer,
          company_name: testValues[0].offer.companyName,
          timestamp: timestamp,
          offer_id: `${uuidv4()}`,
          location_id: testValues[0].location_id
        }
      }
    ],
    expectedRetValue: {
      ...testValues[0].offer,
      offer_id: 123456789,
      location_id: testValues[0].location_id
    }
  }
];

testcases.forEach(
  async ({ db, args, expectedDBCalls, expectedRetValue }, i) => {
    await expect(PostOfferResolver(db, args)).resolves.toEqual(
      // also includes a timestamp
      expect.objectContaining(expectedRetValue)
    );
    expectedDBCalls.forEach(i => {
      const operation = expectedDBCalls[i].operation;
      delete expectedDBCalls[i].operation;
      const expected = expectedDBCalls[i];
      expect(db[operation].mock.calls[0][0]).toEqual(expected);
    });
  }
);
