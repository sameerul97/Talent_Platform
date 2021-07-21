![Talent Platform](https://raw.githubusercontent.com/sameerul97/Talent_Platform/master/src/img/tp.JPG)

# Talent Platform (Creative Directory)

### Challenge

Creating a Single Page Application in Vanilla JS (ES6).

In React, we define all the pages / routes in app.js and
React mounts the component in the DOM without reloading.

How can we replicate same behaviour in ES6, show different page (component) without reloading the page ?

### Solution

Wrote a tiny vanilla based router library which was heavily influenced by react router, angular route guard.

## After all everything in javascript is just a object

Dev will pass an object for each route, specfying url, view (component) , whether `this` route is private and a controller function. Controller function will be called once the route component is mounted succefully.

Recently included route validation, where route can be specified if they are private and if they are private, ` privateRouteValidation` will be executed before changing each route.

```javascript
new Router({
  container: document.getElementById("app"),
  defaultRoute: "home",
  routeFallback: NotFound,
  routes: [
    ...{
      url: "crew/category/{categoryid}",
      view: Search.render,
      private: true,
      controller: CrewsController
    }
  ],
  privateRouteValidation: async function () {
    return await get("/gateway/");
  }
});
```

### Bugs

When changing from one route to another route, while fetch request is pending / loading, puts the application in infinite state, due to JS asynchronous behaviour.
Solution is to cancel any ongoing fetch requests. (I never came across this issue, as react router handles those task internally)

### Methods

```javascript
changeRoute("#home", function () {
  PubSub.publish("userLoggedIn", `dataObject`);
});
```

Router exposes method called `changeRoute`, where dev can programtically change route and pass in additional callback to be executed after route is changed. Above code was taken fron login controller, where change route is exexuted after user succefully login. In the callback we execute PubSub publish.

We can change route using default web API `document.location.hash = "#home"`, router interally watches when a route is changed and executes necessary task. However, when we execute following code, it will break.

```javascript
// logincontroller.js
document.location.hash = "#home";
PubSub.publish("userLoggedIn", `dataObject`);

// sidebar.js
PubSub.subscribe("userLoggedIn", LoadProjectsInSidebar);
const LoadProjectsInSidebar = async () => {
  await get("/projects/");
  ...
};
```

Due to JS asynchronous behaviour, it will cancel the `get("/projects/")` in sidebar.js before route is changed. As mentioned earlier, router cancel any ongoing fetch request before changing a route. Solution was to execute the PubSub publish method via callback once the route is changed.

### Events

```javascript
MyRouter.on('routeChanged', () => { ... } )
```

Router exposes event called routeChanged where we can execute additional code if required.


