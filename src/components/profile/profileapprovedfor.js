import { DisplayNoneClass } from "../../utils/css";

const ProfileApprovedFor = {
    render: (el_profile_approved_for_wrapper) => {
        const html = /*html*/`
            <!-- <div class="filter-button-shine profile-category-name-shine" id="profile_category_name_loading"></div> -->
            <p class="heading">Approved For:</p>
            <p class="info" id="profile_approved_for">
            </p>
        `;

        el_profile_approved_for_wrapper.innerHTML += html;

        return;
    },

    init: async function (data, profile_id) {
        try {
            const el_profile_approved_for = document.getElementById("profile_approved_for");

            data.forEach((i, index) => el_profile_approved_for.innerHTML += this.approvedFor(i, data.length, index));

            Array.from(el_profile_approved_for.children).forEach(function (item) {
                item.onclick = (e) => {
                    console.log(`Profile id: ${profile_id} , Brand id: ${e.target.getAttribute('data-brand-id')}`)
                }
            });

        } catch (err) { }
    },

    approvedFor: (brand, length, index) => {
        const html = /*html*/`
            <span id="brand_${brand.id}" data-brand-id="${brand.id}"> ${brand.name}${length - 1 === index ? "" : ","}</span >
        `

        return html;
    }
}

export default ProfileApprovedFor;
