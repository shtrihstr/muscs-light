import React, { Component } from 'react';
import activeHtml from 'react-active-html';

import Link from 'components/Html/Link';
import Iframe from 'components/Html/Iframe';
import Image from 'components/Html/Image';

export default class ActiveHtml extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.html !== nextProps.html;
    }

    render() {
        const { html } = this.props;

        const componentsMap = {
            iframe: (props) => <Iframe {...props} />,
            img: (props) => <Image {...props} />,
            a: (props) => <Link {...props} />,
        };

        return (
            <div className="active-html">{activeHtml(html, componentsMap)}</div>
        );
    }
}


const iframe = (attr) => {
    return (
        <LazyLoad once throttle={250} placeholder={<div className="iframe-placeholder"><div/></div>} >
            <iframe {...attr} />
        </LazyLoad>
    );
};

const img = (attr) => {
    const src = attr.src.replace(/http(s)?:\/\/(www\.)?united\.no\//, 'https://www.united.no/');
    const srcSet = (attr.srcSet || '').replace(/http(s)?:\/\/(www\.)?united\.no\//g, 'https://www.united.no/');
    return (
        <img {...attr} src={src} srcSet={srcSet} />
    );
};
