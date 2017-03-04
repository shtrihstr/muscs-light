import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router';
import { ApolloProvider } from 'react-apollo';

import store from 'store/index';
import apollo from 'store/apollo';

import Main from 'layouts/Main';
import Home from 'containers/Home';
import SingleArticle from 'containers/SingleArticle'

ReactDOM.render(
    <ApolloProvider store={store} client={apollo}>
        <Router history={hashHistory} onUpdate={()=>window.scrollTo(0, 0)}>
            <Route path="/" component={Main}>
                <IndexRoute component={Home} />
                <Route path="nyhetsarkiv/:slug/" component={SingleArticle} />
            </Route>
        </Router>
    </ApolloProvider>,
    document.getElementById('app')
);