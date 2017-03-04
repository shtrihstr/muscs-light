import React, { Component, PropTypes } from 'react';
import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import throttle from 'utils/throttle';

import { getIdFromObject } from 'store/apollo';

import Article, { ArticleLoader } from 'components/Article';

import postsList from 'queries/posts-list.graphql';

@graphql(postsList, {
    options({ offset, before }) {
        return {
            variables: {
                offset: offset || 0,
                limit: 5,
                before: before || null
            }
        };
    }
})
@connect((store) => ({
    apollo: store.apollo,
    app: store.app
}))
class Feed extends Component {

    constructor(...args) {
        super(...args);

        this.state = {
            hasMorePosts: true,
            loadingMore: false
        };

        this.scrollHandlerFunction = throttle(this.scrollHandler.bind(this), 250);
    }

    componentDidMount() {
        this.bindScrollHandler();
    }

    componentWillUnmount() {
        this.unbindScrollHandler();
    }

    componentWillReceiveProps(nextProps) {
        if (!!this.props.data.posts && !!nextProps.data.posts && this.props.data.posts.length != nextProps.data.posts.length) {
            this.setState({
                loadingMore: false
            });
        }
    }

    bindScrollHandler() {
        window.addEventListener('scroll', this.scrollHandlerFunction, false);
        window.addEventListener('wheel', this.scrollHandlerFunction, false)
    }

    unbindScrollHandler() {
        window.removeEventListener('scroll', this.scrollHandlerFunction, false);
        window.removeEventListener('wheel', this.scrollHandlerFunction, false);
    }

    scrollHandler() {

        if (!this.state.hasMorePosts) {
            return this.unbindScrollHandler();
        }

        if (!this.state.loadingMore) {

            const scrollTop = !!window.pageYOffset ? window.pageYOffset : (document.compatMode === 'CSS1Compat' ? document.documentElement.scrollTop : document.body.scrollTop);

            const documentHeight = !!document.height ? document.height : Math.max(
                document.body.scrollHeight,
                document.body.offsetHeight,
                document.documentElement.clientHeight,
                document.documentElement.scrollHeight,
                document.documentElement.offsetHeight
            );

            const screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

            if (scrollTop + screenHeight > (documentHeight - screenHeight)) {
                this.loadMore();
            }
        }
    }

    loadMore() {
        const { app, data: { posts, fetchMore } } = this.props;

        if (!posts || !this.state.hasMorePosts || this.state.loadingMore || app.offline) {
            return;
        }

        this.setState({
            loadingMore: true
        });

        fetchMore({
            variables: {
                offset: posts.length
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
                if (!fetchMoreResult.data || fetchMoreResult.data.posts.length == 0) {
                    this.setState({
                        hasMorePosts: false,
                        loadingMore: false
                    });
                    return previousResult;
                }
                return Object.assign({}, previousResult, {
                    posts: [...previousResult.posts, ...fetchMoreResult.data.posts]
                });
            }
        });
    }

    renderArticle(post) {
        const { app, apollo } = this.props;

        let inactive = false;

        if (app.offline) {
            const cacheId = getIdFromObject(post);
            const fullLoaded = !!apollo.data[cacheId] && typeof apollo.data[cacheId].content != 'undefined';
            inactive = !fullLoaded;
        }

        return <Article key={post.id} post={post} type="list" inactive={inactive} />;
    }

    render() {
        const { data } = this.props;

        if (data.loading || !data.posts) {
            return (
                <section className="feed">
                    <ArticleLoader />
                    <ArticleLoader />
                </section>
            );
        }

        const nodes = data.posts.map(this.renderArticle.bind(this));

        return (
            <section className="feed">
                {nodes}
                {this.state.loadingMore ? <ArticleLoader /> : null}
            </section>
        );
    }
}

export default Feed;
