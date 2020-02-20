import { dbQuery, dbScan } from "./resolverHelper";

it("should build filter params for dynamoDB", () => {
  const table = "StudentDev";
  const testCases = [
    {
      description: "should pull single param from object",
      params: {
        db: {
          scan: jest.fn().mockReturnValue({
            promise: () => {
              return {
                Items: {
                  id: "thisisauniqueid",
                  firstname: "Braden",
                  lastname: "Watkins"
                }
              };
            }
          })
        },
        table: table,
        filters: [
          {
            field: "student_id",
            value: "123456789",
            comp: "="
          }
        ]
      },
      expectedDBCall: {
        TableName: table,
        FilterExpression: "student_id = :student_id",
        ExpressionAttributeValues: {
          ":student_id": "123456789"
        }
      },
      expectedRetValue: {
        id: "thisisauniqueid",
        firstname: "Braden",
        lastname: "Watkins"
      }
    }
  ];

  testCases.forEach(async ({ params, expectedDBCall, expectedRetValue }) => {
    await expect(
      dbScan(params.db, params.table, params.filters)
    ).resolves.toEqual(expectedRetValue);
    expect(db.scan.mock.calls[i][0]).toEqual(expectedDBCall);
  });
});
