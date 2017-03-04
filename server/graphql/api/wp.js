const WPAPI = require('wpapi');
const NodeCache = require('node-cache');
const apiCache = new NodeCache();

const wp = new WPAPI({
    endpoint: 'https://www.united.no/wp-json',
    transport: {
        get: (wpreq, cb) => {

            const cacheKey = wpreq.toString();
            const result = apiCache.get(cacheKey);

            if (result !== undefined) {
                if (cb && typeof cb === 'function') {
                    cb(null, result);
                }

                return Promise.resolve(result);
            }

            return WPAPI.transport.get(wpreq, cb).then((result) => {
                apiCache.set(cacheKey, result, 120);
                return result;
            });
        }
    }
});

const commentsCount = (post) => {
    return new Promise((resolve, reject) => {
        wp.comments().parent(post.id).perPage(1).then((comments) => {
            if (!!comments && !!comments._paging) {
                resolve(Number(comments._paging.total));
            }
            resolve(0);
        }).catch(() => {
            resolve(0);
        });
    });
};

module.exports = wp;
module.exports.commentsCount = commentsCount;
