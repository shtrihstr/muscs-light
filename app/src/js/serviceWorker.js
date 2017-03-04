import toolbox from 'sw-toolbox';

toolbox.precache(['/', '/index.html', '/app.js', '/css/style.css']);

// static files
const staticRegEx = /(js|css|png|jpe?g|gif|svg|bmp|tiff?|woff|woff2|ttf|ttc|otf|eot)(\?.*)?$/gi;
toolbox.router.get(staticRegEx, toolbox.cacheFirst);

// gavatar
toolbox.router.get(/\/avatar\//gi, toolbox.cacheFirst);

toolbox.router.get('/', toolbox.networkFirst);
toolbox.router.get('/nyhetsarkiv/(.*)', toolbox.networkFirst);


const graphqlCache = 'graphql-v1';

toolbox.router.post('/graphql', (request) => {
    return request.clone().json().then((body) => {

        if (!body.query || body.query.indexOf('mutation ') !== -1) {
            return fetch(request);
        }

        let cachedRequestUrl = `${request.url}?query='${body.query}'`;

        if (!!body.operationName) {
            cachedRequestUrl += `&operationName=${body.operationName}`;
        }

        if (!!body.variables) {
            cachedRequestUrl += `&variables='${JSON.stringify(body.variables)}'`;
        }

        const cachedRequest = new Request(cachedRequestUrl, {
            method: 'GET',
            mode: request.mode,
            credentials: request.credentials,
            redirect: request.redirect,
            referrer: request.referrer,
            headers: request.headers
        });


        return caches.open(graphqlCache).then((cache) => {
            return cache.match(cachedRequest).then((cachedResponse) => {

                return new Promise((resolve, reject) => {
                    fetch(request).then((response) => {

                        if (!response.ok) {
                            if (!!cachedResponse) {
                                return resolve(cachedResponse);
                            } else {
                                return resolve(response);
                            }
                        }

                        cache.put(cachedRequest, response.clone());
                        return resolve(response);

                    }).catch((error) => {

                        if (!!cachedResponse) {
                            return resolve(cachedResponse);
                        }

                        return reject(error);
                    });
                });
            });
        });
    });
});