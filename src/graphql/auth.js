import * as admin from "firebase-admin";
import logger from "./logger";

console.log({
  environment: process.env.API_ENV,
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
});

admin.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
});

const firebaseAuthMiddleware = (req, res, next) => {
  if (process.env.API_ENV === "schema") {
    next();
    return;
  }
  const authorization = req.header("Authorization");
  if (authorization) {
    let token = authorization.split(" ");
    logger.log("Auth Header:", token);
    admin
      .auth()
      .verifyIdToken(token[1])
      .then(decodedToken => {
        logger.log("Decoded token:", decodedToken);
        res.locals.user = decodedToken;
        next();
      })
      .catch(err => {
        logger.log(err);
        res.sendStatus(401);
      });
  } else {
    logger.log("Unauthorized");
    res.sendStatus(401);
  }
};

export default firebaseAuthMiddleware;
