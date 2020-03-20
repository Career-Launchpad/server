import { dbQuery, dbScan } from "./resolverHelper";
import { TABLES } from "../environment";

describe("Resolver Helpers", () => {
  const table = TABLES.Student;
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

  testCases.forEach(
    async ({ params, description, expectedDBCall, expectedRetValue }) => {
      it(description, async () => {
        await expect(
          dbScan(params.db, params.table, params.filters)
        ).resolves.toEqual(expectedRetValue);
        expect(params.db.scan.mock.calls[0][0]).toEqual(expectedDBCall);
      });
    }
  );
});
