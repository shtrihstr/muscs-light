import ApolloClient, { createNetworkInterface, toIdValue } from 'apollo-client';

const networkInterface = createNetworkInterface({
    uri: '/graphql',
    queryDeduplication: true
});

export const getIdFromObject = (object) => {
    if (!!object['slug'] && !!object['__typename']) {
        return object['__typename'] + object['slug'];
    }

    return null;
};

const apollo = new ApolloClient({
    networkInterface: networkInterface,
    addTypename: true,
    customResolvers: {
        Query: {
            post: (_, args) => toIdValue(getIdFromObject(Object.assign({}, args, { __typename: 'Post' })))
        }
    },
    dataIdFromObject: getIdFromObject
});

export default apollo;