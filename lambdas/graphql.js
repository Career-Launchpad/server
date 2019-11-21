import "core-js/stable";
import "regenerator-runtime/runtime";
import AWSExpress from "aws-serverless-express";
import app from "../src/graphql/index";

const server = AWSExpress.createServer(app);
const handler = (event, context) => AWSExpress.proxy(server, event, context);

export { handler };
