import React, { Component, PropTypes } from 'react';
import { graphql, withApollo } from 'react-apollo';

import Article, { ArticleLoader } from 'components/Article';
import Author from 'components/Author';
import Feed from './Feed';

import postList from 'queries/post-list.graphql';
import postSingle from 'queries/post-single.graphql';

@graphql(postSingle, {
    options: ({ params }) => ({ variables: { slug: params.slug } })
})
@withApollo
class SingleArticle extends Component {

    constructor(...args) {
        super(...args);

        this.state = {
            postFromCache: null
        };
    }

    componentWillMount() {
        this.loadExistDataFromCache(this.props.params.slug);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.params.slug !== this.props.params.slug) {
            this.loadExistDataFromCache(nextProps.params.slug);
        }
    }

    loadExistDataFromCache(slug) {
        this.setState({
            postFromCache: null
        });

        this.props.client.query({
            noFetch: true,
            query: postList,
            variables: { slug }
        }).then((result) => {
            if (!!result && !!result.data && !!result.data.post) {
                this.setState({
                    postFromCache: result.data.post
                });
            }
        });
    }

    render() {

        const { data } = this.props;

        if ((data.loading || !data.post) && !this.state.postFromCache) {
            return (
                <div className="wrapp-single">
                    <div className="top-sub-bar">
                        <Author />
                    </div>
                    <section className="single">
                        <ArticleLoader />
                    </section>
                </div>
            );
        }

        const post = this.state.postFromCache && data.loading ? this.state.postFromCache : data.post;

        return (
            <div className="wrap-single">
                <div className="top-sub-bar">
                    <Author user={post.author} />
                </div>
                <section className="single">
                    <Article key={post.id} post={post} type="single" />
                    <aside>
                        <div className="divider hero">Andre artikler</div>
                        <Feed before={post.date} />
                    </aside>
                </section>
            </div>
        );
    }
}


export default SingleArticle;