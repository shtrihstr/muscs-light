import React, { Component } from 'react';

export default class Image extends Component {

    fixSrc(src) {
        return (src || '').replace(/http(s)?:\/\/(www\.)?united\.no\//g, 'https://www.united.no/');
    }

    render() {
        const props = Object.assign({}, this.props, {
            src: this.fixSrc(this.props.src),
            srcSet: this.fixSrc(this.props.srcSet)
        });

        return (
            <img {...props} />
        );
    }
}