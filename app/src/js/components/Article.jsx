import React, { Component } from 'react';
import Link from 'components/Html/Link';
import Image from 'components/Html/Image';

import humanizeTime, { dateToString } from 'utils/humanizeTime';

import ActiveHtml from './ActiveHtml';

export default class Article extends Component {

    render() {
        const { post, type, inactive } = this.props;

        if (!post || !post.title) {
            return <ArticleLoader />
        }

        if (type == 'list') {
            return <ArticleShort post={post} inactive={inactive} />
        } else {
            return <ArticleFull post={post} />
        }
    }
}

export const ArticleLoader = (props) => {
    return (
        <article className="post loader">
            <header className="post-header">
                <div className="post-image loader" />
                <h2 className="post-title loader">&nbsp;</h2>
            </header>
            <TextLoader />
            <footer className="post-meta">
                <span className="comments-count loader"></span>
                <span className="fb-count loader"></span>
                <time className="post-date loader"></time>
            </footer>
        </article>
    );
};

const ArticleFull = (props) => {
    const { post } = props;
    const fullLoaded = typeof post.content != 'undefined';

    return (
        <article key={post.id} className="post">
            <Header post={post} h1 />
            <div className="hero excerpt" dangerouslySetInnerHTML={{ __html: post.excerpt }} />
            <Footer post={post} />
            { fullLoaded ? <div className="content"><ActiveHtml html={post.content} /></div> : <TextLoader />}
            <div className="post-end" />
        </article>
    );
};

const ArticleShort = (props) => {
    const { post, inactive } = props;

    const body = [
        <Header key={0} post={post} />,
        <div key={1} className="hero excerpt" dangerouslySetInnerHTML={{ __html: post.excerpt }} />,
        <Footer key={2} post={post} />
    ];

    const block = !!inactive ? body : (<Link href={post.link} className="block" >{body}</Link>);
    const className = 'post' + (!!inactive ? ' inactive' : '');

    return <article key={post.id} className={className}>{block}</article>;
};


class Header extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return false;
    }

    getImageUrl() {
        const { post } = this.props;
        const sizes = post.featured.sizes;
        const properSize = sizes.filter((size) => size.name == 'three-thumb')[0];
        if (!!properSize) {
            return properSize.url;
        }
        return (sizes.filter((size) => size.name == 'full')[0] || sizes[sizes.length - 1]).url;
    }

    render() {
        const { post, h1 } = this.props;
        const HeadTag = h1 ? 'h1' : 'h2';
        return (
            <header className="post-header">
                <div className="post-image">
                    <Image src={this.getImageUrl()} />
                </div>
                <HeadTag className="post-title" dangerouslySetInnerHTML={{ __html: post.title }} />
            </header>
        );
    }
}

class Footer extends Component {

    constructor(...args) {
        super(...args);
        this.state = {
            humanTime: null
        };
    }

    componentDidMount() {
        const { post } = this.props;

        // run only in client side
        this.setState({
            humanTime: humanizeTime(new Date(post.dateGmt))
        });
    }

    render() {
        const { post } = this.props;
        const time = new Date(post.dateGmt);
        const humanTime = !!this.state.humanTime ? this.state.humanTime : dateToString(time);
        return (
            <footer className="post-meta">
                <span className="comments-count">{post.commentsCount}</span>
                <span className="fb-count">{post.shares}</span>
                <time className="post-date" dateTime={time.toISOString()}>{humanTime}</time>
            </footer>
        );
    }
}

const TextLoader = (props) => {
    return (
        <div className="text-loader">
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};