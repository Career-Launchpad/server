const dbQuery = async (db, table, item_id) => {
  const params = {
    TableName: table,
    Key: {
      id: item_id
    }
  };
  let response = await db.get(params).promise();
  return response.Item || {};
};

const getDeepAttribute = (item, path) => {
  let dot;
  if ((dot = path.indexOf(".")) >= 0) {
    let attr = path.slice(0, dot);
    return getDeepAttribute(item[attr], path.slice(dot + 1));
  } else {
    return item[path];
  }
};

const passesFilter = (filter, item) => {
  let actual = getDeepAttribute(item, filter.field);
  let filterValue = parseAs(filter.value, filter.parseValueAs);
  switch (filter.comp) {
    case "=":
      return actual === filterValue;
    case ">":
      return actual > filterValue;
    case "<":
      return actual < filterValue;
    case ">=":
      return actual >= filterValue;
    case "<=":
      return actual <= filterValue;
  }
};

const passesFilters = (filters, item) => {
  return filters == null || !filters.some(f => !passesFilter(f, item));
};

const parseAs = (value, type) => {
  switch (type) {
    case "string":
      return `${value}`;
    case "int":
      return parseInt(value);
    case "float":
      return parseFloat(value);
    case "boolean":
      return value === "true";
    default:
      console.error(`Unknown parseType: ${type}`);
      return value;
  }
};

const dbScan = async (db, table, filters) => {
  let FilterExpression;
  let ExpressionAttributeValues;
  let ExpressionAttributeNames;

  let preFilters = filters && filters.filter(f => !f.field.includes("."));
  let postFilters = filters && filters.filter(f => f.field.includes("."));

  if (preFilters && preFilters.length) {
    ExpressionAttributeValues = {};
    ExpressionAttributeNames = {};
    FilterExpression = "";
    for (let i in preFilters) {
      const { field, value, comp, parseValueAs } = preFilters[i];
      const fieldName = `#${field}`;
      FilterExpression += `${fieldName} ${comp} :${field}`;
      ExpressionAttributeValues[`:${field}`] = parseAs(value, parseValueAs);
      ExpressionAttributeNames[`${fieldName}`] = field;
      if (i < preFilters.length - 1) {
        FilterExpression += " AND ";
      }
    }
  }

  const params = {
    TableName: table,
    FilterExpression,
    ExpressionAttributeValues,
    ExpressionAttributeNames
  };

  let results = await db.scan(params).promise();
  let items = results.Items || [];
  if (Array.isArray(items)) {
    return items.filter(i => passesFilters(postFilters, i));
  } else {
    return passesFilters(postFilters, items) ? items : [];
  }
};

export { dbQuery, dbScan };
