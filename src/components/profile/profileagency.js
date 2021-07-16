import { DisplayNoneClass } from "../../utils/css";

const ProfileAgency = {
    render: (el_profile_agency_wrapper) => {
        const html = /*html*/`
            <div class="contact-container" id="contact-container">
                <p class="heading">Agency:</p>
                 <div data-agency-shine="true" class="filter-button-shine profile-category-name-shine"></div>
                <p class="info d-none" id="profile_agency_name">M&C Saatchi Merlin</p>
                <p class="heading">Contact:</p>
                 <div data-agency-shine="true" class="filter-button-shine profile-category-name-shine"></div>
                <p class="info d-none" id="profile_agency_contact_name">Alex Ficher</p>
                <p class="heading">Phone:</p>
                 <div data-agency-shine="true" class="filter-button-shine profile-category-name-shine"></div>
                <p class="info d-none" id="profile_agency_phone_number">
                    <a href="tel:+4407400273677" target="_blank">+44 07400 273677</a>
                </p>
                <p class="heading">Email:</p>
                 <div data-agency-shine="true" class="filter-button-shine profile-category-name-shine"></div>
                <p class="info d-none" id="profile_agency_email">
                    <a href="mailto:alex.ficher@mcsaatchimerlin.com" target="_blank">alex.ficher@mcsaatchimerlin.com</a>
                </p>
                <p class="heading">Portfolio:</p>
                 <div data-agency-shine="true" class="filter-button-shine profile-category-name-shine"></div>
                <p class="info d-none" id="profile_website_link">
                    <a href="http://laurawhitmore.com/" target="_blank">www.luarawhitmore.com</a>
                </p>
            </div>
            <!-- <button id="edit_profile_name">edit</button> -->
        `;

        el_profile_agency_wrapper.innerHTML += html;

        return;
    },

    init: async ({ agency_contact_name, agency_email, agency_name, agency_phone_number, agency_website, website_link, phone_number, profile_id, }) => {
        try {
            const el_profile_agency_name = document.getElementById("profile_agency_name");
            const el_profile_agency_contact_name = document.getElementById("profile_agency_contact_name");
            const el_profile_agency_phone_number = document.getElementById("profile_agency_phone_number");
            const el_profile_agency_email = document.getElementById("profile_agency_email");
            const el_profile_website_link = document.getElementById("profile_website_link");
            const el_contact_container_loading = document.querySelectorAll(".contact-container [data-agency-shine='true'");
            const Not_Specified = "Not specified"

            el_contact_container_loading.forEach(i => i.remove());

            if (agency_name === "") {
                el_profile_agency_name.classList.remove(DisplayNoneClass);
                el_profile_agency_name.innerHTML = Not_Specified;
            } else {
                el_profile_agency_name.classList.remove(DisplayNoneClass);
                el_profile_agency_name.innerHTML = agency_name;
            }

            if (agency_contact_name === "") {
                el_profile_agency_contact_name.classList.remove(DisplayNoneClass);
                el_profile_agency_contact_name.innerHTML = Not_Specified;
            } else {
                el_profile_agency_contact_name.classList.remove(DisplayNoneClass);
                el_profile_agency_contact_name.innerHTML = agency_contact_name;
            }

            if (agency_email === "") {
                el_profile_agency_email.classList.remove(DisplayNoneClass);
                el_profile_agency_email.innerHTML = Not_Specified;
            } else {
                el_profile_agency_email.classList.remove(DisplayNoneClass);
                el_profile_agency_email.innerHTML = agency_email;
            }

            if (agency_phone_number === "") {
                el_profile_agency_phone_number.classList.remove(DisplayNoneClass);
                el_profile_agency_phone_number.innerHTML = Not_Specified;
            } else {
                el_profile_agency_phone_number.classList.remove(DisplayNoneClass);
                el_profile_agency_phone_number.innerHTML = `+44 0${agency_phone_number}`;
            }

            if (website_link === "") {
                el_profile_website_link.classList.remove(DisplayNoneClass);
                el_profile_website_link.innerHTML = Not_Specified;
            } else {
                el_profile_website_link.classList.remove(DisplayNoneClass);
                el_profile_website_link.innerHTML = website_link;
            }

            // document.getElementById("edit_profile_name")
            //     .addEventListener("click", () => {
            //         console.log("Profile edit button")
            //         document.getElementById("profile_name").innerHTML += "ss";
            //     })
        } catch (err) { }
    }
}

export default ProfileAgency;
