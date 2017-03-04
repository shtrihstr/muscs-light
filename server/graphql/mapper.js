const getShareCount = require('./api/fb.js').getShareCount;
const commentsCount = require('./api/wp.js').commentsCount;

const maps = {
    post: {
        dateGmt: 'date_gmt',
        modifiedGmt: 'modified_gmt',
        commentStatus: 'comment_status',
        title: [ 'title', 'rendered' ],
        content: [ 'content', 'rendered' ],
        excerpt: [ 'excerpt', 'rendered' ],
        shares: (post) => getShareCount(post.link),
        commentsCount: (post) => commentsCount(post)
    },
    media: {},
    user: {
        avatar: ['avatar_urls', ['96']]
    }
};

const mapper = (map, data) => {

    Object.keys(map).forEach((key) => {
        const property = map[key];

        if (typeof property === 'string') {
            data[key] = data[property];
        } else if (typeof property === 'function') {
            data[key] = property(data);
        } else {
            let tmp = data;
            property.forEach((p) => {
                tmp = tmp[p];
            });

            data[key] = tmp;
        }
    });


    return data;
};


module.exports = mapper;
module.exports.maps = maps;