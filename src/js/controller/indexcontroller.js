import SideBarAllProject from "../../components/sidebar/allproject.js";
import CreateProject from "../../components/modal/createproject.js";

import { DisplayNoneClass } from "../../utils/css.js";
import { get } from "../libs/request";
import { PubSub } from "../libs/router";

async function IndexController() {
    const el_sidebar_all_project_wrapper = document.getElementById("sidebar_all_project_wrapper");
    const el_nav_login_button = document.getElementById("nav_login_button");
    const el_nav_logout_button = document.getElementById("nav_logout_button");
    const el_sidebar = document.getElementById("sidebar");
    const el_sidebar_collapse_button = document.getElementById("sidebarCollapse");
    const el_back_button = document.getElementById('backbtn');

    const el_modal_create_new_project_wrapper = document.getElementById("index_modal_create_new_project_wrapper");
    const el_index_modal_create_new_project = "index_modal_create_new_project";

    // Modal triggered by Side navbar Add new button;
    CreateProject.render(el_modal_create_new_project_wrapper, el_index_modal_create_new_project);
    CreateProject.init(false, el_index_modal_create_new_project);

    const ShowSideBarProjects = async (data) => {
        SideBarAllProject.render(el_sidebar_all_project_wrapper);

        const all_projects = await GetAllProject();

        console.log(all_projects);

        if (!all_projects.error) {
            SideBarAllProject.init(all_projects)
        }
    };

    const UserLoggedIn = async () => {
        console.log("User logged in, Index controller");

        el_sidebar.classList.remove(DisplayNoneClass);
        el_nav_logout_button.classList.remove(DisplayNoneClass);
        el_nav_login_button.classList.add(DisplayNoneClass);

        setTimeout(async () => {
            el_sidebar_collapse_button.click();
            ShowSideBarProjects();
            el_back_button.classList.remove(DisplayNoneClass);
        }, 250)
    };

    const HideSideBar = async (data) => {
        el_nav_login_button.classList.remove(DisplayNoneClass);
        el_nav_logout_button.classList.add(DisplayNoneClass);
        el_sidebar_collapse_button.click();
        el_back_button.classList.add(DisplayNoneClass);

        setTimeout(() => {
            el_sidebar.classList.add(DisplayNoneClass);
        }, 250)
    };

    const GetAllProject = async function () {
        const all_projects = await get("/user/project/index.php");

        return all_projects;
    }

    el_sidebar_collapse_button.click();

    $(document).ready(function () {
        if (window.config.userLoggedIn) {
            el_sidebar_collapse_button.click();
            el_nav_logout_button.classList.remove(DisplayNoneClass);
            el_nav_login_button.classList.add(DisplayNoneClass);
            el_sidebar.classList.remove(DisplayNoneClass);
            el_back_button.classList.remove(DisplayNoneClass);
        }
    });

    el_nav_logout_button.onclick = () => HideSideBar();

    PubSub.subscribe('userLoggedIn', UserLoggedIn);
    // pubSub.subscribe('userLoggedOut', HideSideBar);

    PubSub.subscribe('projectCreated', ShowSideBarProjects);

    if (window.config.userLoggedIn) {
        ShowSideBarProjects();
    }
}

export default IndexController;

// window.IndexController = IndexController;