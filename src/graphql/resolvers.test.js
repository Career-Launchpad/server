describe("Resolvers", () => {
  it("Student Resolver", () => {});
});

// describe('Resolvers', () => {
//   it('CreateStudentResolver', () => {
//     const testcases = [
//       {
//         desc: "Should error because no student_id",
//         args: {},
//         expected: {},
//         error: new TypeError("student_id was undefined")
//       },
//       {
//         args: {},
//         expected: {},
//         error: {}
//       },
//       {
//         args: {},
//         expected: {},
//         error: {}
//       },
//       {
//         args: {},
//         expected: {},
//         error: {}
//       },
//       {
//         args: {},
//         expected: {},
//         error: {}
//       },
//     ]

//     testcases.forEach(tc => {
//       if (tc.expected) {
//         expect(StudentResolver(db, tc.args)).resolves.toStrictEqual(tc.expected)
//       }
//       if (tc.error) {
//         expect(StudentResolver(db, tc.args)).rejects.toStrictEqual(tc.expected)
//       }
//     })
//   })
// })
