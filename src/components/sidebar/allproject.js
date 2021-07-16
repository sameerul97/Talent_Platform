import { DisplayNoneClass } from "../../utils/css";


const SideBarAllProject = {
    render: function(el_sidebar_all_project_wrapper) {
        const html = /*html*/ `
            <ul class="list-unstyled components" id="sidebar_all_project">
                <p class="heading">Your projects</p>
                <div id="sidebar_all_project_loading">
                    ${this.projectLoading()}
                </div>
            </ul>
        `

        el_sidebar_all_project_wrapper.innerHTML = html;
    },

    init: function(projects) {
        const el_sidebar_all_project = document.getElementById("sidebar_all_project");
        const el_sidebar_all_project_loading = document.getElementById("sidebar_all_project_loading");

        el_sidebar_all_project_loading.classList.add(DisplayNoneClass);

        projects.forEach((project) => el_sidebar_all_project.innerHTML += this.project(project));
    },

    project: (project) => {
        const html = /*html*/ `
            <li>
                <a href="#project/${project.id}">${project.name}</a>
            </li>
        `

        return html;
    },

    projectLoading: (number_of_loading_elements = 5) => {
        const html = /*html*/ `
            <div class="filter-button-shine modal-add-to-project-loading" style="margin-left: 0px !important;"></div>
        `;

        return Array(number_of_loading_elements).fill().map(i => html).join("");
    },

};

export default SideBarAllProject;