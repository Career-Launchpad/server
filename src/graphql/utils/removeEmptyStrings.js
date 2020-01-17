const removeEmptyStrings = obj => {
  for (var prop in obj) {
    if (typeof obj[prop] === "object") {
      removeEmptyStrings(obj[prop]);
    } else if (obj[prop] === "") {
      delete obj[prop];
    }
  }
  return obj;
};

export default removeEmptyStrings;
