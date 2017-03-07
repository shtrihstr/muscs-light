import { createStore, applyMiddleware, compose } from 'redux';
import { getInitialState, registerStoreWatcher } from 'store/offline';
import reducers from 'store/reducers/index';
import apollo from 'store/apollo';

const store = createStore(
    reducers,
    getInitialState(),
    compose(
        applyMiddleware(apollo.middleware())
    )
);

registerStoreWatcher(store);

export default store;