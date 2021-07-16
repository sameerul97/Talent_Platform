window.config = {
    appName: "Creative Directory",
    appVersion: 0.4,
    apiUrl: getApiDomain(),
    userLoggedIn: false
};

// import { NotFound } from "../components/notfound/notfound.js";

// document.addEventListener("DOMContentLoaded", async function () {
    console.log("App js", window.config);

    // const ShowSideBar = (data) => { console.log('Logged from APP.js', data); window.config.userLoggedIn = true; };
    // pubSub.subscribe('userLoggedIn', ShowSideBar);

    // const amILoggedIn = async function () {
    //     return await get("/gateway/index.php")
    // };

    // const logged = await amILoggedIn();
    // // console.log(logged);

    // if (!logged.error) {
    //     window.config.userLoggedIn = true;
    // }

    // IndexController();

    // window.MyRouter = new Router({
    //     container: document.getElementById("content"),
    //     defaultRoute: "login",
    //     routeFallback: NotFound,
    //     routes: [
    //         {
    //             url: "home",
    //             view: "pages/index.html",
    //             private: true,
    //         },
    //         {
    //             url: "login",
    //             view: "pages/login.html",
    //         },
    //         {
    //             url: "logout",
    //             view: "pages/logout.html",
    //             private: true,
    //         },
    //         {
    //             url: "talent",
    //             view: "pages/talent.html",
    //             private: true,
    //         },
    //         {
    //             url: "crew/category/{categoryid}",
    //             view: "pages/search.php?categoryid={categoryid}",
    //             private: true,
    //         },
    //         {
    //             url: "crew/{id}",
    //             view: "pages/profile.php?id={id}",
    //             private: true,
    //         },
    //         {
    //             url: "project/{projectid}",
    //             view: "pages/project.php?projectid={projectid}",
    //             private: true,
    //         },
    //         {
    //             url: "crew",
    //             view: "pages/crew.html",
    //             private: true,
    //         },
    //     ],
    //     privateRouteValidation: async function () {
    //         return await get("/gateway/index.php")
    //     },
    // });

    // window.MyRouter.on('routeChanged', data => {
    //     $(bb).fadeIn();
    // });

// });

function getApiDomain() {
    const url = window.location.href.split("/")[2];
    if (url === "planetradio.co.uk" || url === "creative.bauermedia.co.uk") {
        return "https://creative.bauermedia.co.uk/talent_platform/v3/api";
    } else {
        return "http://localhost:8888/Project_2021/talent_platform/api";
    }
}

