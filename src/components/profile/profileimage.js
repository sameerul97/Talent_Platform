import { DisplayNoneClass } from "../../utils/css";

const ProfileImage = {
    render: async (el_profile_data_wrapper) => {
        const html = /*html*/`
            <div id="profile_image_wrapper" style="line-height: 0;">
                <div data-image-shine="true" class="loading shine"></div>
                <img src="" class="img-fluid profile-pic d-none">
            </div>
        `;

        el_profile_data_wrapper.innerHTML += html;

        return;
    },

    init: async (data) => {
        try {
            const el_this_listing = document.getElementById("profile_image_wrapper");
            const el_this_listing_shine = el_this_listing.querySelector(`[data-image-shine=true]`);
            const el_this_listing_image = el_this_listing.querySelector(`img`);

            el_this_listing_image.src = data;

            /* initate onload callback to remove the temporary shine placeholder */
            el_this_listing_image.onload = () => {
                el_this_listing_shine.remove();
                el_this_listing_image.classList.remove(DisplayNoneClass);
            }

            el_this_listing_image.onerror = () => {
                // TODO: Show temporary image ?
                console.error(`Image not found ${data}`)
            }

            // document.getElementById("edit_profile_image")
            //     .addEventListener("click", () => {
            //         console.log("Profile edit button")
            //         document.getElementById("profile_name").innerHTML += "ss";
            //     })
        } catch (err) { }
    }
}

export default ProfileImage;
