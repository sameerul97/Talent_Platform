import { DisplayNoneClass } from "../../utils/css.js";

import { get, post } from "../../js/libs/request";

const AddToProject = {
    render: function (el_modal_add_to_project_wrapper) {
        const html = /*html*/ `
            <div class="modal fade" id="modal_add_to_project" tabindex="-1" aria-labelledby="quick_add_to_project_label" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="add_to_project_label">Add to a project</h5>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body" id="modal_add_to_project_body">
                            <div class="spinner-border text-primary d-none" role="status" id="modal_add_to_project_loading_spinner">
                                <span class="sr-only">Loading...</span>
                            </div>
                            <div id="modal_add_to_project_body_loading">
                                <div class="filter-button-shine modal-add-to-project-loading" id="profile_category_name_loading"></div>
                            </div>

                            <ul id="modal_porject_lists">
                                <!-- Project lists -->
                            </ul>
                            <div id="add_new_project_button_wrapper">
                                <!-- Add new project button [Dynamically pass in profile id and profile name to add new project]-->
                            </div>
                        </div>
                        <div class="modal-footer d-block">
                            <button type="button" class="btn btn-secondary square-btn narrow-btn match-btn d-inline-block" data-bs-dismiss="modal"><i class="fas fa-times-circle"></i> Cancel</button>
                            <button type="button" class="btn btn-success square-btn narrow-btn match-btn float-end" id="modal_add_to_project_button"><i class="fas fa-check-circle"></i> Done</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        el_modal_add_to_project_wrapper.innerHTML = html;
    },

    init: function (is_crew) {
        const el_modal_add_to_project_loading_spinner = document.getElementById("modal_add_to_project_loading_spinner");
        const el_modal_add_to_project = document.getElementById('modal_add_to_project');
        const el_modal_add_to_project_body_loading = document.getElementById("modal_add_to_project_body_loading");
        const el_modal_porject_lists = document.getElementById("modal_porject_lists");
        const el_add_new_project_button_wrapper = document.getElementById("add_new_project_button_wrapper");
        const el_modal_add_to_project_button = document.getElementById("modal_add_to_project_button");

        const modal_add_to_project_reference = new bootstrap.Modal(el_modal_add_to_project, {
            keyboard: false
        })

        let currently_selected_project;

        el_modal_add_to_project.addEventListener('hidden.bs.modal', (e) => {
            // clean modal body
            el_modal_add_to_project_body_loading.innerHTML = this.projectBodyLoading(5);

            // TODO: Put the following lines into reset() function, reduces LOC
            el_modal_porject_lists.innerHTML = "";
            el_add_new_project_button_wrapper.innerHTML = "";
            currently_selected_project = undefined;
        });

        el_modal_add_to_project.addEventListener('show.bs.modal', async (event) => {
            el_modal_add_to_project_body_loading.innerHTML = this.projectBodyLoading(5);
            el_modal_porject_lists.innerHTML = "";
            el_add_new_project_button_wrapper.innerHTML = "";
            el_modal_add_to_project_button.disabled = true;


            const profile_id = $(event.relatedTarget).data('profile-id');
            const profile_name = $(event.relatedTarget).data('profile-name');

            // TODO: Remove console statements
            console.log(profile_id, profile_name, is_crew);

            let all_projects = [];
            let profile_already_in_projects = [];

            await get("/project/all/index.php").then(data => { all_projects = data });
            await get("/crew/project/index.php", { crew_id: profile_id }).then(data => { profile_already_in_projects = data });

            all_projects = await this.intersectingProjects(all_projects, profile_already_in_projects);

            el_modal_add_to_project_body_loading.innerHTML = "";
            el_add_new_project_button_wrapper.innerHTML += this.addNewProjectButton(profile_id, profile_name)

            all_projects.forEach(project => el_modal_porject_lists.innerHTML += this.projectList(project));

            const el_modal_porject_all_lists = el_modal_porject_lists.querySelectorAll(
                "li>input"
            );

            el_modal_porject_all_lists.forEach(item => {
                item.onclick = (e) => {
                    // TODO: Remove console statements
                    console.log(`Project id: ${e.target.id} ${e.target.getAttribute("data-project-id")}`);
                    currently_selected_project = e.target.getAttribute("data-project-id");

                    el_modal_add_to_project_button.disabled = false;
                }
            });

            el_modal_add_to_project_button.onclick = async (e) => {
                el_modal_add_to_project_button.disabled = true;

                if (is_crew) {
                    if (currently_selected_project) {
                        try {
                            el_modal_add_to_project_loading_spinner.classList.remove(DisplayNoneClass);

                            await post("/crew/project/index.php", {
                                crew_id: profile_id,
                                project_id: currently_selected_project
                            });

                            setTimeout(() => {
                                modal_add_to_project_reference.hide();
                                currently_selected_project = undefined;
                                el_modal_add_to_project_loading_spinner.classList.add(DisplayNoneClass);

                                el_modal_add_to_project_button.disabled = false;
                            }, 1500);

                        } catch (error) {
                            // TODO: Show error Message in modal
                            console.log(error);
                            el_modal_add_to_project_button.disabled = false;
                        }
                    } else {
                        // TODO: Show validation message in Modal if Project not selected
                        modal_add_to_project_reference.hide();
                        el_modal_add_to_project_button.disabled = false;
                    }
                }

                if (!is_crew) {
                    // Add Talent to a Project 
                    // POST TO "/talent/project/index.php"
                }

            }

        });


    },

    intersectingProjects: (all_projects, profile_already_in_projects) => {
        return new Promise(function (resolve, reject) {
            for (const i in all_projects) {
                const project = all_projects[i];

                for (const j in profile_already_in_projects) {
                    const profile_in_project = profile_already_in_projects[j];

                    if (profile_in_project.id === project.id) {
                        project.already_in_project = true;
                    }
                }
            }

            resolve(all_projects);
        })
    },

    projectList: (project) => {
        const html = /*html*/ `
            <li>
                <input type="radio" id="project_id_${project.id}" data-project-id="${project.id}" name="selector" ${project.already_in_project ? 'disabled' : ""}>
                <label for="project_id_${project.id}" id="project_id_${project.id}" data-project-id="${project.id}"
                    ${project.already_in_project ? 'disabled' : ""}
                    style=${project.already_in_project ? "text-decoration-line:line-through" : ""}>
                    ${project.name}
                </label>
                <div class="check"></div>
            </li>
        `

        return html;
    },

    addNewProjectButton: (profile_id, profile_name) => {
        const html = /*html*/ `
            <button type="button" class="btn btn-primary round-btn modal-btn" data-bs-toggle="modal" data-profile-name=${profile_name} data-profile-id=${profile_id} data-bs-target="#modal_create_new_project" data-bs-dismiss="modal"><i class="fas fa-plus"></i>
                Add New
            </button>
        `

        return html;
    },

    projectBodyLoading: (number_of_loading_elements = 5) => {
        const html = /*html*/ `
            <div class="filter-button-shine modal-add-to-project-loading"></div>
        `;

        return Array(number_of_loading_elements).fill().map(i => html).join("");
    },
}

export default AddToProject;