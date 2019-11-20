"use strict";
import express from "express";
import bodyParser from "body-parser";
import expressGraphQL from "express-graphql";
import DynamoDB from "aws-sdk/clients/dynamodb";
import Schema from "./schema";

const dynamoDB = new DynamoDB.DocumentClient({ region: "us-east-1" });
const app = express();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  "/",
  expressGraphQL(() => ({ graphiql: true, schema: Schema(dynamoDB) }))
);
app.set("port", 8080);
app.listen(app.get("port"), () => {
  const port = app.get("port");
  console.log("GraphQL Server Running at http://127.0.0.1:" + port);
});

export default app;
