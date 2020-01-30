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
    [index, hasItem] = findPlaceOf(offer.company_name, res, compareStrings);

    if (hasItem) continue;

    insertAtIndex(offer.company_name, res, index);
  }
  return res;
};

/*
* Finds the index where a new item should be inserted in a sorted array to
* maintain the sort
*/
const findPlaceOf = (newStr, sortedStringArray, comparator) => {
  let index = 0;
  for (var str of sortedStringArray) {
    let comp = comparator(newStr, str)
    if (comp < 0) {
      //newStr should be before string
      return [index, false];
    }
    else if (comp === 0) {
      return [index, true];
    }
    index += 1;
  }
}

const compareStrings = (a, b) => a.localeCompare(b);

const insertAtIndex = (item, array, index) => array.splice(index, 0, item);

export default GetCompanyNamesResolver;
