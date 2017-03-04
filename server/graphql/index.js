const makeExecutableSchema = require('graphql-tools').makeExecutableSchema;
const fs = require('fs');
const path = require('path');
const resolvers = require('./resolvers.js');

const schema = fs.readFileSync(  path.resolve(__dirname, 'schema.graphql')).toString();

exports = module.exports = makeExecutableSchema({
    typeDefs: schema,
    resolvers
});