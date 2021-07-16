import { DisplayNoneClass } from "../../utils/css";

const ProfileCategory = {
    render: (el_profile_data_wrapper) => {
        const html = /*html*/`
        <div class="filter-button-shine profile-category-name-shine" id="profile_category_name_loading"></div>
        <p id="profile_category_name" class="heading black d-none">Photographer</p>  
            <!-- <button id="edit_profile_name">edit</button> -->
        `;

        el_profile_data_wrapper.innerHTML += html;

        return;
    },

    init: async (data) => {
        try {
            const el_profile_category = document.getElementById("profile_category_name");
            const el_profile_category_loading = document.getElementById("profile_category_name_loading");

            el_profile_category_loading.remove();
            el_profile_category.classList.remove(DisplayNoneClass);

            el_profile_category.innerHTML = data;

            // document.getElementById("edit_profile_name")
            //     .addEventListener("click", () => {
            //         console.log("Profile edit button")
            //         document.getElementById("profile_name").innerHTML += "ss";
            //     })
        } catch (err) { }
    }
}

export default ProfileCategory;
