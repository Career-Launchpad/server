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
    TableName: "Student"
  };
  return promisify(callback => {
    db.scan(params, callback);
  }).then(result => {
    console.log(result);
    if (!result.Items) return { id: args.id };
    return result.Items;
  });
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

const GetOffersResolver = async db => {
  const params = {
    TableName: "Offer"
  };
  let offers = await db.scan(params).promise();

  let res = [];

  for await (let offer of offers.Items) {
    let offerId = offer.offer_id;
    let bonusesParams = {
      TableName: "Bonus",
      KeyConditionExpression: "#i = :id",
      ExpressionAttributeNames: {
        "#i": "id"
      },
      ExpressionAttributeValues: {
        ":id": offerId
      }
    };
    let bonuses = await db.query(bonusesParams).promise();
    res.push({ ...offer, bonuses: bonuses.Items });
  }
  return res;
};

const PostOfferResolver = async (db, args) => {
  const offer = args.offer.offer;

  const location = offer.location;
  delete offer.location;
  const bonuses = offer.bonuses;
  delete offer.bonuses;

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
    IndexName: "name-index",
    KeyConditionExpression: "#nm = :name",
    ExpressionAttributeNames: {
      "#nm": "name"
    },
    ExpressionAttributeValues: {
      ":name": offer.company_name
    }
  };
  let companyName = null;
  let company = await db.query(companyParams).promise();
  companyName = company.Items[0].name;
  let uuid = uuidv4();

  if (company.Items.length === 0) {
    let addCompanyParams = {
      TableName: "Company",
      Item: { id: uuid, name: offer.company_name }
    };
    company = await db.put(addCompanyParams).promise();
    companyName = company.Items[0].name;
  }

  // upload bonuses to Bonus table
  for await (let bonus of bonuses) {
    const postBonusParams = {
      TableName: "Bonus",
      Item: {
        id: uuid,
        ...bonus
      }
    };
    await db.put(postBonusParams).promise();
  }

  let uploadable = {
    ...args.offer.offer,
    company_name: companyName,
    timestamp: new Date().getTime(),
    offer_id: uuidv4(),
    location_id
  };
  const postOfferParams = {
    TableName: "Offer",
    Item: uploadable
  };
  await db.put(postOfferParams).promise();
  return uploadable;
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
  GetOffersResolver,
  PostOfferResolver,
  PostStudentResolver
};
