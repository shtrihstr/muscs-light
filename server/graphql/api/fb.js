const fetch = require('node-fetch');
const NodeCache = require('node-cache');

const shareCache = new NodeCache();

let oldShareValues = {};

const getShareCount = (url) => {

    const cachedCount = shareCache.get(url);

    if (cachedCount !== undefined) {
        return cachedCount;
    }

    fetch(`https://graph.facebook.com/?id=${url}`)
        .then((resp) => resp.json())
        .then((data) => {
            let count = 0;

            if (!!data && !!data.share && !!data.share.share_count) {
                count = data.share.share_count;
            }

            shareCache.set(url, count, 60 * 30);
            oldShareValues[url] = count;
        });

    return oldShareValues[url] || 0;
};

exports = module.exports = {
    getShareCount
};