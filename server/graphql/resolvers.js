const mapper = require('./mapper.js');
const maps = require('./mapper.js').maps;
const wp = require('./api/wp.js');

const resolveFunctions = {
    Query: {
        posts(root, args) {
            return new Promise((resolve, reject) => {
                const loader = wp.posts();
                if (!!args.limit) loader.perPage(args.limit);
                if (!!args.offset) loader.offset(args.offset);
                if (!!args.before) loader.before(args.before);
                loader.then((posts) => {
                    try {
                        resolve(posts.map((post) => mapper(maps.post, post)));
                    } catch (e) {
                        reject(e);
                    }
                }).catch((e) => reject(e));

            });
        },
        post(root, args) {
            return new Promise((resolve, reject) => {
                wp.posts().slug(args.slug).then((posts) => {
                    try {
                        resolve(mapper(maps.post, posts[0]));
                    } catch (e) {
                        reject(e);
                    }
                }).catch((e) => reject(e));
            });
        }
    },
    Post: {
        featured(post) {
            if (!post.featured_media) {
                return null;
            }

            return new Promise((resolve, reject) => {
                wp.media().id(post.featured_media).then((media) => {
                    try {
                        resolve(mapper(maps.media, media));
                    } catch (e) {
                        reject(e);
                    }
                }).catch((e) => reject(e));
            });
        },
        author(post) {
            if (!post.author) {
                return null;
            }

            return new Promise((resolve, reject) => {
                wp.users().id(post.author).then((user) => {
                    try {
                        resolve(mapper(maps.user, user));
                    }
                    catch (e) {
                        reject(e);
                    }
                }).catch((e) => reject(e));
            });
        }
    },
    Media: {
        sizes(media) {
            const sizes = media.media_details.sizes;

            return Object.keys(sizes).map((name) => {
                return {
                    url: sizes[name].source_url,
                    name: name,
                    height: sizes[name].height,
                    width: sizes[name].width
                }
            });
        }
    }
};

exports = module.exports = resolveFunctions;