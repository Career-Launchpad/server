import removeEmptyStrings from "./removeEmptyStrings";

describe("removeEmptyStrings", () => {
  it("should remove attributes with empty strings from an object", () => {
    const testcases = [
      {
        input: {
          a: "a",
          b: "b",
          c: ""
        },
        expected: {
          a: "a",
          b: "b"
        }
      }
    ];

    testcases.forEach(({ input, expected }) => {
      expect(removeEmptyStrings(input)).toEqual(expected);
    });
  });
});
