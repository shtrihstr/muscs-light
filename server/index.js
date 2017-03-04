const express = require('express');
const cors = require('cors');
const graphqlHTTP = require('express-graphql');
const { buildSchema, graphql } = require('graphql');

const schema = require('./graphql/index.js');

var app = express();

app.use('/graphql', cors(), graphqlHTTP({
    schema: schema,
    graphiql: true
}));

app.listen(4000);
