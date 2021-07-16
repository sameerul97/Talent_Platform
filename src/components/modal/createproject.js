import { DisplayNoneClass } from "../../utils/css.js";

import { get, post } from "../../js/libs/request";

const CreateProject = {
    render: function (el_modal_create_new_project_wrapper, index_modal_create_new_project = false) {
        const html = /*html*/ `
            <div class="modal fade" id=${index_modal_create_new_project ? index_modal_create_new_project : "modal_create_new_project"} tabindex="-1" aria-labelledby="quick_add_project_label" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <form id="modal_create_project_form">
                            <div class="modal-header">
                                <h5 class="modal-title" id="add_to_project_label">Add a New Project</h5>
                                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="mb-3">
                                    <label for="project_title" class="form-label">Project Title</label>
                                    <input type="text" name="project_title" class="form-control" id="project_title" aria-describedby="project_title_help">
                                </div>
                                <div class="mb-3">
                                    <label for="project_date" class="form-label">Project Date</label>
                                    <input type="date" name="project_date" class="form-control" id="project_date" aria-describedby="project_date_help">
                                </div>
                                <div class="mb-3">
                                    <label for="project_destination" class="form-label">Brand(s)</label>
                                    <input type="text" name="project_destination" class="form-control" id="project_destination" aria-describedby="project_destination_help">
                                    <div id="project_destination_help" class="form-text">You can add multiple brands. eg.
                                        Grazia, Kiss, Heat</div>
                                </div>
                                <div class="d-flex">
                                    <div class="spinner-border d-none" role="status" id="created_project_loading">
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                    <div class="mb-3 mx-3  form-text  d-none" id="create_project_message">
                                        <p>Creating Project</p>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer d-block">
                                <button type="button" class="btn btn-secondary square-btn narrow-btn match-btn d-inline-block" data-bs-dismiss="modal"><i class="fas fa-times-circle"></i> Cancel</button>
                                <button type="submit" class="btn btn-success square-btn narrow-btn match-btn float-end" id="modal_create_project_button"><i class="fas fa-check-circle"></i> Done</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        `;

        el_modal_create_new_project_wrapper.innerHTML = html;
    },

    init: (is_crew = false, index_modal_create_new_project = false) => {
        const el_modal_create_new_project = index_modal_create_new_project ? document.querySelector('#' + index_modal_create_new_project) : document.querySelector("#modal_create_new_project");
        const el_modal_create_project_button = el_modal_create_new_project.querySelector("#modal_create_project_button");
        const el_modal_create_project_form = el_modal_create_new_project.querySelector("#modal_create_project_form");
        const el_modal_created_project_loading = el_modal_create_new_project.querySelector("#created_project_loading");
        const el_modal_create_project_message = el_modal_create_new_project.querySelector('#create_project_message');

        const create_project_modal_reference = new bootstrap.Modal(el_modal_create_new_project, {
            keyboard: false
        })

        el_modal_create_new_project.addEventListener('hidden.bs.modal', function (e) {
            // clean modal body
        });

        el_modal_create_new_project.addEventListener('show.bs.modal', function (event) {
            // TODO: Disable create project button until form fields are valid

            const profile_id = $(event.relatedTarget).data('profile-id');
            const profile_name = event.relatedTarget.getAttribute('data-profile-name');

            console.log(profile_id, profile_name, is_crew, this);
            $(this).find(".modal-body").innerHTML += profile_id;

            el_modal_create_project_form.addEventListener("submit", async function (e) {

                // TODO: Block Ui submit button until API responds
                e.preventDefault();
                el_modal_create_project_message.classList.remove(DisplayNoneClass);
                el_modal_created_project_loading.classList.remove(DisplayNoneClass);

                const formData = new FormData(el_modal_create_project_form);
                const [name, date, brand] = [formData.get('project_title'), formData.get('project_date'), formData.get('project_destination')];

                // TODO: Implement form validation before sending post request
                try {
                    // TODO: Implement form validation before sending post request
                    const { created_project_id } = await post('/project/create/index.php', {
                        name: name,
                        date: date,
                        brand: brand
                    });
                    // TODO: Reset the form input fields, once the project is created successfully

                    el_modal_create_project_message.innerHTML = `Project Created. Adding ${profile_name} to ${name} project`;

                    // Dispath PubSub projectCreated to re-render all project in sidebar
                    pubSub.publish('projectCreated', `Data ${new Date()}`);

                    // Add this profile id into this project once created
                    if (profile_id) {
                        if (is_crew) {
                            const res = await post("/crew/project/index.php", {
                                crew_id: profile_id,
                                project_id: created_project_id
                            });

                            console.log(res);

                            el_modal_create_project_message.innerHTML = `Added ${profile_name} to ${name} project`;

                            setTimeout(() => {
                                create_project_modal_reference.hide();
                                el_modal_create_project_message.innerHTML = "";
                                el_modal_create_project_message.classList.add(DisplayNoneClass);
                                el_modal_created_project_loading.classList.add(DisplayNoneClass);
                            }, 5500);
                        } else {
                            // await post("/talent/project/index.php", {
                            //     crew_id: profile_id,
                            //     project_id: created_project_id
                            // });
                        }

                    } else {

                        // TODO: Show Project created and the Talent / Crew has been added into the project message then hide modal
                        // setTimeout(() => $('#modal_create_new_project').modal('hide'), 2500)
                        setTimeout(() => create_project_modal_reference.hide(), 1500)
                    }

                } catch (error) {
                    // TODO: Handle project create error
                    console.error(error)
                }
            });
        });
    },

    createProject: async (postBody) => {
        // TODO: Implement POST logic inside this function.
    }
}

export default CreateProject;