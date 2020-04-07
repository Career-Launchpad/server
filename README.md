# Welcome to Prospect's Backend!

Hi! I'm your helpful successor who cares about knowledge transfer on this project. You will find all of the necessary links and information listed below. We will cover several topics such as: DynamoDB Table setup, AWS SDK usage, GraphQL, using Lambda to setup API's, and a few others.

# Project Structure

Below are the different main folders and their contents explained.

## serverless.yml

This is your main file used for setting up different API endpoints through Lambda. You can add additional api endpoints by adding them below the "functions:" section of the yml file. Follow the conventions as seen in the file. For details on the purpose of the yml file and how to use it you can check out this website: [https://serverless.com/examples/](https://serverless.com/examples/)

## lambdas

This folder contains root Lambda functions. We currently have 2 set up: 1 for our GraphQL resolvers and 1 for our authentication API. If a new endpoint is being added, you will want to add your function to this folder, using the same conventions as seen in our auth.js file.

## src/resolvers

Contains all of the resolver functions. Fairly self explanatory. See "GraphQL" for details on resolvers.

## src/resolvers/getCompaniesResolver.js

Gets all companies from the Company Table

## src/resolvers/getCompanyNamesResolver.js

Returns list of all companies that appear in the Offers table

## src/resolvers/getMajorsResolver.js

Returns list of all majors that appear in the Offers table

## src/resolvers/getOffersResolver.js

Returns a list of all offers

## src/resolvers/getStudentResolver.js

Returns student given filters

## src/resolvers/getStudentsResolver.js

Returns list of all students

## src/resolvers/postOfferResolver.js

Adds Offer to Offers table. This includes adding in bonus information into the bonus table, checking if the company exists already and if not, then adding that company to the company table, Adding the offer location to the locations table.

## src/resolvers/postStudentResolver.js

Adds new student when they input their information through the email form.

## src/resolvers/resolverHelper.js

Helper method that takes any filters passed in GraphQL schema and turns them into a dynamodb filter parameter.

## src/resources

Folder for code that is not used in project, but important for visualizing overall structure of data and tables. Also contains MySQL snapshot from when we used MySQL with our MVP.

## src/types

Folder for GraphQL types so that the schema is not bogged down.

## src/utils

Folder for helper functions used by resolvers.

## schema.js

Contains GraphQL schema. See section below on GraphQL for details.

## index.js

Base file for GraphQL resolvers. Sets up GraphQL.

## environment.js

This file helps deploy to the correct table in Dynamo based on whether it's deploying to our dev or prod APIs. You can see where it's being set in the package.json file under "scripts".
