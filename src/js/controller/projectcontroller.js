import { DisplayNoneClass } from "../../utils/css.js";
import { get, del } from "../libs/request";
import { NotFound } from "../../components/notfound/notfound.js";
import { getParams } from "../libs/router";

import CategoryCarousel from "../../components/project/categorycarousel.js";
import ProjectUserList from "../../components/project/projectuserlist.js";

async function ProjectController() {
    const project_id = parseInt(getParams().projectid);
    
    const el_inner_content = document.getElementById("inner-content");
    const el_project_name_loading = document.getElementById("project_name_loading");
    const el_project_info_wrapper = document.querySelector("#project_info_wrapper");
    const el_project_name = el_project_info_wrapper.querySelector("h2");
    const el_project_brand_and_data = el_project_info_wrapper.querySelector("p");
    const el_project_carousel_wrapper = document.getElementById("project_carousel_wrapper");
    const el_modal_delete_from_project = document.getElementById("delete_from_project");
    const el_project_user_list_wrapper = document.getElementById("project_user_list_wrapper");

    try {
        ProjectUserList.render(el_project_user_list_wrapper);

        const [ProjectInfo, ProjectCategories, ProjectColloborators] = await Promise.all([
            get("/project/", { project_id: project_id }),
            get("/project/category/", { project_id: project_id }),
            get("/project/user/index.php", { project_id: project_id })
        ]);

        ProjectUserList.init(ProjectColloborators);

        if (ProjectInfo.error) {
            el_inner_content.innerHTML = NotFound("Project");
            return;
        }

        el_project_name.innerHTML = ProjectInfo.name;
        el_project_brand_and_data.innerHTML = `${ProjectInfo.brand} - ${new Date(ProjectInfo.date).toDateString().split(' ').slice(1).join(' ')}`;
        el_project_name_loading.classList.add(DisplayNoneClass)

        const promises = [];

        for (const i in ProjectCategories) {
            const { category_id, project_id, name } = ProjectCategories[i];
            const el_crew_category_carousel_container_id = `crew_category_id_${category_id}_project_id_${project_id}`;

            CategoryCarousel.render(el_project_carousel_wrapper, el_crew_category_carousel_container_id, name);
            promises.push(getCrewForCategory(category_id, project_id, el_project_carousel_wrapper, el_crew_category_carousel_container_id, name));
        }

        Promise.all(promises);
    } catch (error) {
        // TODO: Handle Error, if fetching a project fails
    }

    const el_modal_delete_from_project_reference = new bootstrap.Modal(el_modal_delete_from_project, {
        keyboard: false
    })

    el_modal_delete_from_project.addEventListener('show.bs.modal', function (event) {
        const profile_name = event.relatedTarget.getAttribute('data-profile-name');
        const profile_id = event.relatedTarget.getAttribute('data-profile-id');
        const category_id = event.relatedTarget.getAttribute('data-category-id');
        const project_id = event.relatedTarget.getAttribute('data-project-id');
        const is_crew = event.relatedTarget.getAttribute('data-is-crew');
        const carousel_item_id = event.relatedTarget.getAttribute("data-carousel-item-id");
        const el_delete_from_project_button = this.querySelector("#delete_from_project_button");

        el_delete_from_project_button.onclick = async () => {
            // TODO: Show loading animation until API responds back
            const DeleteBody = {
                crew_id: profile_id,
                category_id: category_id,
                project_id: project_id,
            }

            if (is_crew) {
                await del("/crew/project/index.php", DeleteBody);
            }

            document.querySelector(`#${carousel_item_id}`).closest('div.owl-item').remove();

            el_project_carousel_wrapper.querySelectorAll(".owl-container").forEach(carousel_container => {
                const this_carousel_slides = carousel_container.querySelectorAll(".owl-item");

                if (this_carousel_slides.length === 0) {
                    carousel_container.remove();
                }
            });

            el_modal_delete_from_project_reference.hide();
        }

        this.querySelector("#user-message").innerHTML = `Are you sure you want to remove ${profile_name} from this project`;
        this.querySelector('#profile-id').setAttribute('profile-id', profile_id);

        // console.log(this)
        // console.log(`Profile id: ${profile_id}, Profile name: ${profile_name}, Category id: ${category_id}, Project id: ${project_id}, is crew: ${is_crew}`);
    })

    document.querySelector("#delete_from_project").addEventListener('hidden.bs.modal', function (e) {
        this.querySelector("#user-message").innerHTML = "";
        // clean modal body
    });

    async function getCrewForCategory(category_id, project_id, el_project_carousel_wrapper, carousel_container_id, category_name) {
        const res = await get("/project/crew/", { project_id: project_id, category_id: category_id }).then(data => {
            // console.log(data, el_project_carousel_wrapper, carousel_container_id, category_name);
            const is_crew = true;

            CategoryCarousel.init(carousel_container_id, category_name, data, category_id, project_id, is_crew);
        });
    }
}


export default ProjectController;


// window.ProjectController = ProjectController;