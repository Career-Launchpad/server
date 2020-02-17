import { GetMany, GetSingle, BuildFilterParams } from "./resolverHelper";

it("should build filter params for dynamoDB", () => {
  const testCases = [
    {
      description: "should pull single param from object",
      params: { field: "student_id", value: "123456789" },
      expected: {
        KeyConditionExpression: "#student_id = :student_id",
        ExpressionAttributeNames: {
          "#student_id": "student_id"
        },
        ExpressionAttributeValues: {
          ":student_id": "123456789"
        }
      }
    }
  ];

  testCases.forEach(({ params, expected }) => {
    expect(BuildFilterParams(params)).toEqual(expected);
  });
});
