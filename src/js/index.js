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
                view: Home.render,
                private: true,
            },
            {
                url: "login",
                view: Login.render,
                isLoginRoute: true,
                controller: LoginController,
            },
            {
                url: "logout",
                private: true,
                view: Logout.render,
                controller: LogOutController,
            },
            {
                url: "crew/category/{categoryid}",
                view: Search.render,
                private: true,
                controller: CrewsController,
            },
            {
                url: "crew/{id}",
                view: Profile.render,
                private: true,
                controller: ProfileController,
            },
            {
                url: "project/{projectid}",
                view: Project.render,
                private: true,
                controller: ProjectController,
            },
            {
                url: "crew",
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
    });

    MyRouter.init();
});

function getApiDomain() {
    const url = window.location.href.split("/")[2];
    if (url === "planetradio.co.uk" || url === "creative.bauermedia.co.uk") {
        return "https://creative.bauermedia.co.uk/talent_platform/v3/api";
    } else {
        return "http://localhost:8888/Project_2021/talent_platform/api";
    }
}
