const request = (url, params = {}, method = "GET") => {
    let options = {
        method,
    };

    if ("GET" === method) {
        url += "?" + new URLSearchParams(params).toString();
    } else {
        options.body = JSON.stringify(params);
    }

    return fetch(config.apiUrl + url, options).then((response) => {
        const t = 0;
        const delay = t => new Promise(resolve => setTimeout(resolve, t));

        if (response.status === 204) {
            // No content
            // return;
            return delay(t).then(() => void 0);
        }

        return delay(t).then(() => response.json());
    });
};

const get = (url, params) => request(url, params, "GET");
const post = (url, params) => request(url, params, "POST");
const put = (url, params) => request(url, params, "PUT");
const del = (url, params) => request(url, params, "DELETE");

export {
    get,
    post,
    put,
    del
}