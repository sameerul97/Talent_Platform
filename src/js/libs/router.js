const DefaultRouterSettings = {
    default: "home",
    routes: [],
    content: document.getElementById("app"),
    privateRouteValidation: () => void 0
};

const RouterParams = {};
let RouteChangedCallbacks = [];
const Router = function ({
    defaultRoute,
    routes,
    container,
    privateRouteValidation,
    routeFallback,
}) {
    Router.params = {}
    Router.routeChangedCallbacks = [];
    Router.callbacks;

    /* TODO: Check if any private route is specified and throw error if privateRouteValidation is not specified */
    Router.RouterSettings = {
        default: defaultRoute ? defaultRoute : DefaultRouterSettings.default,
        routes: routes,
        content: container ? container : DefaultRouterSettings.content,
        privateRouteValidation: privateRouteValidation ?
            privateRouteValidation : DefaultRouterSettings.privateRouteValidation,
        routeFallback: routeFallback ? routeFallback : "Route Not found"
    };

    Router.LoadPage = async function (hash) {
        const url = hash.substring(1);

        const Route = await FindRouteUrl(url);

        // Prevent going back to login page if sessino is already set
        // TODO: Add custom callback as param for each route
        // if (Route.url === 'login') {
        if (Route.isLoginRoute) {
            const res = await Router.RouterSettings.privateRouteValidation();

            if (!res.error) {
                document.location.hash = "#home";

                return;
            }
        }

        if (Route.private) {
            const res = await Router.RouterSettings.privateRouteValidation();

            if (res.error) {
                document.location.hash = "#login";

                return;
            }
        }

        if (Route.view) {
            try {
                const html = await Route.view();

                InsertHTML(html, Router.RouterSettings.content);

                if (Route.controller) {
                    Route.controller();
                }

                document.location.hash = "#" + Route.url;
            } catch (error) {
                Router.RouterSettings.content.innerHTML = "";

                if (typeof Router.RouterSettings.routeFallback === 'function') {
                    Router.RouterSettings.content.innerHTML = Router.RouterSettings.routeFallback("Page");
                } else {
                    Router.RouterSettings.content.innerHTML = Router.RouterSettings.routeFallback;
                }

                // console.log("Page not found");
            }
        } else {
            Router.RouterSettings.content.innerHTML = "";

            if (typeof Router.RouterSettings.routeFallback === 'function') {
                Router.RouterSettings.content.innerHTML = Router.RouterSettings.routeFallback("Route");
            } else {
                Router.RouterSettings.content.innerHTML = Router.RouterSettings.routeFallback;
            }

            // console.warn("404 Route not defined");
        }
    };

    const FindRouteUrl = (url) => {
        // return new Promise((resolve) => {
        let route = {};

        Router.RouterSettings.routes.find(function (value, index) {
            const PageHasParams = value.url.match(/\{([a-z]+)\}/g);

            if (PageHasParams) {
                let params = url.match(/([0-9]+)/g);
                let routeUrl = value.url;

                const EnteredRouteUrl = url.split(url.substr(url.lastIndexOf("/")))[0];

                // Check if additional params is passsed
                if (params && PageHasParams.length == params.length) {
                    PageHasParams.forEach(function (name, index) {
                        // TODO: Handle multiple parameters for each route eg: /crew/{24}/image/{22}
                        if (
                            routeUrl.split(routeUrl.substr(routeUrl.lastIndexOf("/")))[0] ===
                            EnteredRouteUrl
                        ) {
                            route = Object.create(value);
                            route.url = url;
                            // route.view = route.view.replace(name, params[index]);

                            Router.params[name.replace(/[{}]/g, "")] = params[0]
                            RouterParams[name.replace(/[{}]/g, "")] = params[0]

                            if (value.private) route.private = value.private;
                        }
                    });
                }
            } else if (value.url === url) {
                route = value;
            }
        });

        return route;
        // });
    };

    window.onhashchange = async () => {
        try {
            window.stop();
        } catch (exception) {
            document.execCommand('Stop');
        }

        await Router.LoadPage(
            window.location.hash ? window.location.hash : "#" + Router.RouterSettings.default
        );

        if (Router.routeChangedCallbacks.length > 0) {
            Router.routeChangedCallbacks[0]();
            Router.routeChangedCallbacks = [];
        }

        if (RouteChangedCallbacks.length > 0) {
            RouteChangedCallbacks[0]();
            RouteChangedCallbacks = [];
        }

        this.dispatch("routeChanged", "changed");
    };

    const InsertHTML = (html, dest) => {
        // create a temporary container and insert provided HTML code
        let container = document.createElement("div");
        container.innerHTML = html;

        // cache a reference to all the scripts in the container
        let scripts = container.querySelectorAll("script");

        // get all child elements and clone them in the target element
        let nodes = container.childNodes;

        // remove existing child nodes from the dom
        dest.innerHTML = "";

        for (let i = 0; i < nodes.length; i++)
            dest.appendChild(nodes[i].cloneNode(true));

        // force the found scripts to execute...
        for (let i = 0; i < scripts.length; i++) {
            let script = document.createElement("script");
            script.type = scripts[i].type || "text/javascript";

            if (scripts[i].hasAttribute("src")) script.src = scripts[i].src;

            script.innerHTML = scripts[i].innerHTML;
            document.head.appendChild(script);
            document.head.removeChild(script);
        }
    };
};

/**
 * Subscribe to router events, pass callback to be exexuted whenever router changes location hash
 * @param {string} name - Router event name ie: routeChanged
 * @param {requestCallback} cb - Optional callback method will be called once the route is changed successfully
 */
Router.prototype.on = function (name, callback) {
    var callbacks = this[name];
    if (!callbacks) this[name] = [callback];
    else callbacks.push(callback);
}

/**
 * Executes all the callback function which are subscribed using 'routeChanged' listerner
 */
Router.prototype.dispatch = function (name, event) {
    var callbacks = this[name];

    if (callbacks) callbacks.forEach(callback => callback(event));
}

Router.prototype.init = async function () {
    await Router.LoadPage(
        window.location.hash ? window.location.hash : "#" + Router.RouterSettings.default
    );

    return;

    // this.dispatch("routeChanged", "changed");
}

/**
 * Changes document location to give new route and executes if any callback is passed.
 *
 * Usage: Use change route when you need to execute additonal statements on your side through callback
 *
 * @param {string} newRoute - Route name
 * @param {requestCallback} cb - Optional callback will be called once the route is changed successfully
 */
Router.prototype.changeRoute = function (newRoute, cb) {
    document.location.hash = newRoute;

    if (cb) Router.routeChangedCallbacks.push(cb);
}

/**
 * Credit: https://gist.github.com/learncodeacademy/777349747d8382bfb722#gistcomment-2301947
 **/
const PubSub = {
    subscribers: new Map(),
    subscribe(name, fn) {
        if (typeof fn !== "function")
            throw new Error("Second parameter must be a function");
        if (typeof name !== "string")
            throw new Error("First parameter must be a string");

        if (!this.subscribers.has(name)) {
            this.subscribers.set(name, new Map());
        }
        if (fn.name === '') {
            throw new Error('Function cannot be annonymous')
        } else {
            this.subscribers.get(name).set(fn.name, fn)
        }
    },
    unsubscribe(name, fnName) {
        if (this.subscribers.has(name)) {
            if (this.subscribers.get(name).get(fnName)) {
                this.subscribers.get(name).delete(fnName);
                this.subscribers.get(name).size === 0 ? this.subscribers.delete(name) : null;
            } else {
                throw new Error(`Subscriber "${fnName}" not found`);
            }
        } else {
            throw new Error(`Publisher "${name}" not found`)
        }
    },
    publish(name, data) {
        if (this.subscribers.has(name)) {
            this.subscribers.get(name).forEach(fn => fn(data));
        } else {
            throw new Error(`Publisher "${name}" not found`)
        }
    }
};

const getParams = function () { return RouterParams }
const changeRoute = function (newRoute, cb) {
    if (cb) RouteChangedCallbacks.push(cb);

    document.location.hash = newRoute;
}

export { PubSub, Router, changeRoute, getParams };