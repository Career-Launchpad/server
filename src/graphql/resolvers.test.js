import { StudentResolver } from "./resolvers";

describe("StudentResolver", () => {
  it("Should process response value correctly", () => {
    const db = {
      get: (params, callback) => {
        if (params.Key.id === "i_exist")
          callback(null, {
            Item: { id: "i_exist", major: "computer science" }
          });
        callback(null, {});
      }
    };

    const testcases = [
      {
        args: { user_id: "i_exist" },
        expected: { id: "i_exist", major: "computer science" }
      },
      {
        args: { user_id: "i_do_not" },
        error: new RangeError(`Student with id: i_do_not not found`)
      }
    ];
    testcases.forEach(tc => {
      if (tc.expected) {
        expect(StudentResolver(db, tc.args)).resolves.toStrictEqual(
          tc.expected
        );
      }
      if (tc.error) {
        expect(StudentResolver(db, tc.args)).rejects.toStrictEqual(tc.error);
      }
    });
  });
});
