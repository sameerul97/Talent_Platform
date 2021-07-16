import { DisplayBlockClass, DisplayNoneClass } from "../../utils/css";
import "../../css/user-list.css";

const ProjectUserList = {
    render: async function (el_project_user_list_wrapper) {
        const html = /*html*/ `
            <div class="px-0 my-auto text-start">
                <p class="heading">Members</p>
            </div>
            <div class="d-flex  no-gutters" style="">
                <div class="widget" style="">
                    <div class="widget-content ml-0 px-0">
                        <ul class="widget-user-list" id="project_user_list">

                        </ul>
                    </div>
                </div>
                <div class="my-auto ms-2">
                    <button type="button" class="btn btn-primary btn-sm round-btn px-2 py-1 text-white" style="font-size:16px;" data-bs-toggle="modal" data-bs-target="#modal_project_members"><i class="fas fa-plus" aria-hidden="true"></i></button>
                </div>
            </div>
            ${this.projectMembersModal()}
        `

        el_project_user_list_wrapper.innerHTML = html;
        return;
    },

    init: async function (members) {
        const el_project_user_list = document.getElementById("project_user_list");

        members.forEach((member) => {
            el_project_user_list.innerHTML += this.profileList(member);
        })

        // el_project_user_list.innerHTML += this.addMemberButton();
    },

    profileList: (member) => {
        const html = /*html*/ `
            <li data-user-id="${member.id}"><a nohref="nohref"><img src="${member.profile_image}" alt="${member.username}"></a></li>
        `

        return html;
    },

    addMemberButton: () => {
        const html = /*html*/ `
            <button type="button" class="btn btn-primary btn-sm round-btn px-2 py-1 text-white" style="font-size:16px;" data-bs-toggle="modal" data-bs-target="#index_modal_create_new_project"><i class="fas fa-plus" aria-hidden="true"></i></button>
        `

        return html;
    },

    projectMembersModal: () => {
        const html = /*html*/ `
            <div class="modal fade" id="modal_project_members" tabindex="-1" aria-labelledby="modal_project_members_label" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="add_to_project_label">Project members</h5>
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
        `

        return html;
    }
};

export default ProjectUserList;
