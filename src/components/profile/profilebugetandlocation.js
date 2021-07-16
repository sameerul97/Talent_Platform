import { DisplayNoneClass } from "../../utils/css";

const ProfileBudgetAndLocation = {

    render: (el_profile_budget_and_location_wrapper) => {
        const html = /*html*/`
            <div class="d-inline-block detail-block">
                <p class="heading">Budget:</p>
                <p class="info">
                    <span id="profile_min_rate" class=${DisplayNoneClass}>£500 -</span>
                    <span id="profile_max_rate" class=${DisplayNoneClass}>£800 per day</span>
                </p>
            </div>
            <div class="d-inline-block detail-block">
                <p class="heading">Location:</p>
                <p class="info d-none" id="profile_location">London</p>
                <!-- <button id="edit_profile_location">Edit</button> -->
            </div>
        `;

        el_profile_budget_and_location_wrapper.innerHTML += html;

        return;
    },

    init: async ({ min_rate, max_rate, location }, id) => {
        try {
            const el_profile_min_rate = document.getElementById("profile_min_rate");
            const el_profile_max_rate = document.getElementById("profile_max_rate");
            const el_profile_location = document.getElementById("profile_location");
            const el_edit_profile_location_button = document.getElementById("edit_profile_location");

            el_profile_min_rate.innerHTML = `£${min_rate} -`;

            if (max_rate < min_rate || max_rate === 0) {
                el_profile_max_rate.innerHTML = "Not specified";
            } else {
                el_profile_max_rate.innerHTML = `£${max_rate} per day`;
            }

            el_profile_location.innerHTML = location;

            el_profile_min_rate.classList.remove(DisplayNoneClass);
            el_profile_max_rate.classList.remove(DisplayNoneClass);
            el_profile_location.classList.remove(DisplayNoneClass);

            // el_edit_profile_location_button
            //     .addEventListener("click", () => {
            //         console.log("Profile location button", id)
            //         el_profile_location.innerHTML += "ss";
            //     })
        } catch (err) { }
    }
}

export default ProfileBudgetAndLocation;
