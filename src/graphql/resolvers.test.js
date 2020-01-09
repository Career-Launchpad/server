import uuidv4 from "uuid/v4";
import { PostStudentResolver, GetStudentResolver } from "./resolvers";

describe("Resolvers", () => {
  it("PostStudentResolver", async () => {
    const testcases = [
      {
        desc: "should return student object with the given args and a uuid",
        args: {
          student: {
            firstname: "Braden",
            lastname: "Watkins"
          }
        },
        db: {
          put: jest.fn().mockReturnValue({ promise: () => {} })
        },
        expectedDBCall: {
          TableName: "Student",
          Item: {
            firstname: "Braden",
            lastname: "Watkins",
            id: uuidv4()
          }
        },
        expectedRetValue: {
          firstname: "Braden",
          lastname: "Watkins",
          id: uuidv4()
        }
      }
    ];

    testcases.forEach(
      async ({ db, args, expectedDBCall, expectedRetValue }, i) => {
        await expect(PostStudentResolver(db, args)).resolves.toEqual(
          expectedRetValue
        );
        expect(db.put.mock.calls[i][0]).toEqual(expectedDBCall);
      }
    );
  });
});
