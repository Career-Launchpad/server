/*
 * Returns a sorted list of all company_names that have appeared in submitted
 * offers
 */

const GetCompanyNamesResolver = async db => {
  const params = {
    TableName: "Offer"
  };
  let offers = await db.scan(params).promise();
  let res = [];

  for await (let offer of offers.Items) {
    let place = findPlaceOf(offer.company_name, res, compareStrings);

    if (place.exists) continue;

    insertAtIndex(offer.company_name, res, place.index);
  }
  return res;
};

/*
 * Finds the index where a new item should be inserted in a sorted array to
 * maintain the sort
 */
const findPlaceOf = (newStr, sortedStringArray, comparator) => {
  let i = 0;
  for (var str of sortedStringArray) {
    let comp = comparator(newStr, str);
    if (comp < 0) {
      //newStr should be before string
      return { index: i, exists: false };
    } else if (comp === 0) {
      return { index: i, exists: true };
    }
    i += 1;
  }
  return { index: i, exists: false };
};

const compareStrings = (a, b) => a.localeCompare(b);

const insertAtIndex = (item, array, index) => array.splice(index, 0, item);

export default GetCompanyNamesResolver;
