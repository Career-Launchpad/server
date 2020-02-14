const removeEmptyValues = obj => {
  for (var prop in obj) {
    if (typeof obj[prop] === "object") {
      const child = removeEmptyValues(obj[prop]);
      if (!Object.keys(child).length) {
        delete obj[prop];
      }
    } else if (!obj[prop]) {
      delete obj[prop];
    }
  }
  return obj;
};

export default removeEmptyValues;
