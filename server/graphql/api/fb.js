const fetch = require('node-fetch');
const NodeCache = require('node-cache');

const shareCache = new NodeCache();

const getShareCount = (url) => {
    return new Promise((resolve, reject) => {

        const cachedCount = shareCache.get(url);

        if (cachedCount !== undefined) {
            return resolve(cachedCount);
        }

        fetch(`https://graph.facebook.com/?id=${url}`)
            .then((resp) => resp.json())
            .then((data) => {
                let count = 0;
                if (!!data && !!data.share && !!data.share.share_count) {
                    count = data.share.share_count;
                }
                shareCache.set(url, count, 60 * 30);
                resolve(count);
            });

    });
};

exports = module.exports = {
    getShareCount
};