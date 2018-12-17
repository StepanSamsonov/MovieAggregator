const globals = {
    url: 'http://localhost:8000',
    imdb_url_small: 'http://image.tmdb.org/t/p/w185',
    imdb_url_large: 'http://image.tmdb.org/t/p/original',

    transformToQuery(url, params) {
        for (let key in params) {
            if (params.hasOwnProperty(key)) {
                if (Array.isArray(params[key])) {
                    for (let i in params[key]) {
                        url += `&${key}=${params[key][i]}`;
                    }
                } else {
                    url += params[key] ? `&${key}=${params[key]}` : '';
                }
            }
        }
        return url;
    },
};
export default globals;
