import removeEmptyStrings from "./removeEmptyStrings";

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
describe("removeEmptyStrings", () => {
  testcases.forEach(({ input, expected }) => {
    it("test", () => {
      expect(removeEmptyStrings(input)).toEqual(expected);
    });
  });
});
