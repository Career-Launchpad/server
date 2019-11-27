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

const PostOfferResolver = (db, args) => {
  const offer = args.offer.offer;
  console.log(args);
  const params1 = {
    TableName: "Company",
    Key: { id: offer.company_id }
  };

  promisify(async callback => {
    db.get(params1, callback);
  }).then(async result => {
    console.log(result);
    if (!result.Item) {
      console.log("NO ITEM");
    }
    const newcompany = result.id;
    offer.company_id = newcompany;
    const params = {
      TableName: "Student",
      Key: { id: args.offer.id },
      UpdateExpression: "set offer = :o",
      ExpressionAttributeValues: {
        ":o": offer
      },
      ReturnValues: "UPDATED_NEW"
    };
    let p = await promisify(callback => {
      db.update(params, callback);
    }).then(result => {
      if (!result.Item) return args.offer;
      return result.Item;
    });
    return p;
  });
};

const PostStudentResolver = (db, args) => {
  const params = {
    TableName: "Student",
    Item: args.student
  };
  console.log("in post student resolver");
  console.log(args);
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
