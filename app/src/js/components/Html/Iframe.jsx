import React, { Component } from 'react';
import LazyLoad from 'react-lazyload';

export default class Iframe extends Component {

    render() {
        return (
            <LazyLoad once throttle={250} placeholder={<div className="iframe-placeholder"><div/></div>} >
                <iframe {...this.props} />
            </LazyLoad>
        );
    }
}