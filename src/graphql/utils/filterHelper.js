function filterHelper(value) {
  var KeyCondition;
  var Expression = {};
  for (temp in value) {
    var item = temp.field;
    var value = temp.value;
    var comp = temp.comp;
    Expression[`:${item}`] = { S: value };
    KeyCondition += `${item} ${comp} :${item} `;
  }

  const params = {
    ExpressionAttributeValues: Expression,
    KeyConditionExpression: KeyCondition
  };

  return params;
}

export default filterHelper;
