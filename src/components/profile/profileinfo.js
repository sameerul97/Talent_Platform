import { DisplayNoneClass } from "../../utils/css";

const ProfileInfo = {

    render: (el_profile_budget_and_location_wrapper) => {
        const html = /*html*/`
            <p class="heading mt-20">Info:</p>
            <div>
                <p class="info mb-20" id="profile_info"></p>
            </div>
        `;

        el_profile_budget_and_location_wrapper.innerHTML += html;

        return;
    },

    init: async (data, id) => {
        try {
            const el_profile_info = document.getElementById("profile_info");

            if (data === "") {
                el_profile_info.innerHTML = "Not specified";
            } else {
                el_profile_info.innerHTML = data;
            }

            // el_edit_profile_location_button
            //     .addEventListener("click", () => {
            //         console.log("Profile location button", id)
            //         el_profile_location.innerHTML += "ss";
            //     })
        } catch (err) { }
    }
}

export default ProfileInfo;
