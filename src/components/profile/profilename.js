import { DisplayNoneClass } from "../../utils/css";

const ProfileName = {

    render: (el_profile_data_wrapper) => {
        const html = /*html*/`
            <div class=" shine profile-name-shine" id="profile_name_loading"></div>
            <h2 id="profile_name" class="d-none">Jonny Storey</h2>
           <!-- <button id="edit_profile_name">edit</button>  -->
        `;

        el_profile_data_wrapper.innerHTML += html;

        return;
    },

    init: async (data, id) => {
        try {
            const el_profile_name = document.getElementById("profile_name");
            const el_profile_name_loading = document.getElementById("profile_name_loading");

            el_profile_name_loading.remove();
            el_profile_name.classList.remove(DisplayNoneClass);

            el_profile_name.innerHTML = data;

            // document.getElementById("edit_profile_name")
            //     .addEventListener("click", () => {
            //         console.log("Profile edit button", id)
            //         document.getElementById("profile_name").innerHTML += "ss";
            //     })
        } catch (err) { }
    }
}

export default ProfileName;
