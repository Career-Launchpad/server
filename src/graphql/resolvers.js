const uuidv4 = require("uuid/v4");

const promisify = fn =>
  new Promise((resolve, reject) => {
    fn((err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });

const GetStudentResolver = (db, args) => {
  const params = {
    TableName: "Student",
    Key: {
      id: args.id
    }
  };
  return promisify(callback => {
    db.get(params, callback);
  }).then(result => {
    if (!result.Item) return { id: args.id };
    return result.Item;
  });
};

// TODO: Finish GetStudentsResolver
const GetStudentsResolver = (db, args) => {
  const params = {
    TableName: "Student",
    Key: {
      gender: args.gender
    }
  };
  console.log("in get students resolver" + args);
};

const GetOfferResolver = (db, args) => {
  const params = {
    TableName: "Offer",
    Key: {
      id: args.id
    }
  };
  return promisify(callback => {
    db.get(params, callback);
  }).then(result => {
    if (!result.Item) return { id: args.id };
    return result.Item;
  });
};

const PostOfferResolver = async (db, args) => {
  const offer = args.offer.offer;

  const location = offer.location;
  delete offer.location;

  const location_id = `${location.city}${location.state}${location.country}`.replace(
    /\s/g,
    ""
  );

  const locationParams = {
    TableName: "Location",
    Item: { location_id, ...location }
  };

  await db.put(locationParams).promise();

  const companyParams = {
    TableName: "Company",
    Key: { id: offer.company_id }
  };
  let company = await db.get(companyParams).promise();

  const postOfferParams = {
    TableName: "Offer",
    Item: {
      ...args.offer.offer,
      companyName: company.Item.name,
      timestamp: new Date().getTime(),
      offer_id: uuidv4(),
      location_id
    }
  };
  await db.put(postOfferParams).promise();
};

const PostStudentResolver = (db, args) => {
  const params = {
    TableName: "Student",
    Item: {
      ...args.student,
      id: uuidv4()
    }
  };
  return promisify(callback => {
    db.put(params, callback);
  }).then(result => {
    if (!result.Item) return args;
    return result.Item;
  });
};

export {
  GetStudentResolver,
  GetStudentsResolver,
  GetOfferResolver,
  PostOfferResolver,
  PostStudentResolver
};
