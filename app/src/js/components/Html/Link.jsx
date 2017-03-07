import React, { Component } from 'react';
import { Link as RouterLink } from 'react-router';

export default class Link extends Component {

    render() {
        const href = this.props.href || '';

        const isLocal = /^\//.test(href) || /^http(s)?:\/\/(www\.)?united\.no(\/|\/nyhetsarkiv\/.*|\/leserbrev\/.*)$/.test(href);

        if (isLocal) {
            const to = href.replace(/^http(s)?:\/\/(www\.)?united\.no\//, '/');
            return <RouterLink {...this.props} to={to} />;
        } else {
            return <a {...this.props} target="_blank" />;
        }
    }
}