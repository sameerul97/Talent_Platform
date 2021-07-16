import $ from 'jquery';
import "../css/style.css";
import "../css/components.css";
import "../css/owl.carousel.css";
import "../css/owl.theme.default.css";

import crew from "../img/crew.jpg";
import talent from "../img/talent.jpg";
import { NotFound } from "../components/notfound/notfound.js";

// import "./app";
import { PubSub, Router } from "./libs/router";
import { DisplayNoneClass } from '../utils/css';
import Crew from "../pages/crew";
import Home from "../pages/home";
import Profile from "../pages/profile";
import Login from "../pages/login";
import Project from '../pages/project';
import Logout from '../pages/logout';

import Search from "../pages/search";
import CrewsController from "./controller/crewcontroller";
import ProfileController from './controller/profilecontroller';
import IndexController from "./controller/indexcontroller";
import LoginController from "./controller/logincontroller";
import ProjectController from "./controller/projectcontroller";
import LogOutController from './controller/logoutcontroller';

import { get } from "./libs/request";

window.config = {
    appName: "Creative Directory",
    appVersion: 0.4,
    apiUrl: getApiDomain(),
    userLoggedIn: false
};

var bb;


document.addEventListener("DOMContentLoaded", async function () {
    bb = document.getElementById('backbtn');


    $(bb).on('click', function () {
        window.history.back();
    });

    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
        $('#backbtn').toggleClass('move');
        $('#content').toggleClass('full-width');
        $(this).toggleClass('active');
    });


    const amILoggedIn = async function () {
        return await get("/gateway/index.php")
    };

    const logged = await amILoggedIn();
    console.log(logged);

    if (!logged.error) {
        window.config.userLoggedIn = true;
    }

    const ShowSideBar = (data) => { window.config.userLoggedIn = true; };

    PubSub.subscribe('userLoggedIn', ShowSideBar);

    IndexController();

    const MyRouter = new Router({
        container: document.getElementById("content"),
        defaultRoute: "home",
        routeFallback: NotFound,
        routes: [
            {
                url: "home",
                isComponent: true,
                view: Home.render,
                private: true,
            },
            {
                url: "login",
                isComponent: true,
                view: Login.render,
                isLoginRoute: true,
                controller: LoginController,
            },
            {
                url: "logout",
                isComponent: true,
                private: true,
                view: Logout.render,
                controller: LogOutController,
            },
            // {
            //     url: "talent",
            //     view: "/talent.html",
            //     private: false,
            // },
            {
                url: "crew/category/{categoryid}",
                isComponent: true,
                // view: "/search.php?categoryid={categoryid}",
                view: Search.render,
                private: true,
                controller: CrewsController,
            },
            {
                url: "crew/{id}",
                // view: "/profile.php?id={id}",
                isComponent: true,
                // view: "/search.php?categoryid={categoryid}",
                view: Profile.render,
                private: true,
                controller: ProfileController,
            },
            {
                url: "project/{projectid}",
                isComponent: true,
                view: Project.render,
                private: true,
                controller: ProjectController,
            },
            {
                url: "crew",
                isComponent: true,
                view: Crew.render,
                private: true,
            },
        ],
        privateRouteValidation: async function () {
            return await get("/gateway/index.php");
        },
    });

    MyRouter.on('routeChanged', data => {
        $(bb).fadeIn();
        console.log(PubSub);
        // console.log(data, "routeChanged event", new Date());
    });

    MyRouter.init();
});
// Load Events

// console.log(DisplayNoneClass, PubSub, Router);


function getHtmlPageDomain() {
    const domain = window.location.href.split("/")[2];
    // const domain = url.split(":")[0];


    if (domain === 'localhost:8081') {
        console.log(domain)
    }

    // if (url === "planetradio.co.uk" || url === "creative.bauermedia.co.uk") {
    //     return "https://creative.bauermedia.co.uk/talent_platform/v3/api";
    // } else {
    //     return "http://localhost:8888/Project_2021/talent_platform/api";
    // }
}

// getHtmlPageDomain();

function getApiDomain() {
    const url = window.location.href.split("/")[2];
    if (url === "planetradio.co.uk" || url === "creative.bauermedia.co.uk") {
        return "https://creative.bauermedia.co.uk/talent_platform/v3/api";
    } else {
        return "http://localhost:8888/Project_2021/talent_platform/api";
    }
}
