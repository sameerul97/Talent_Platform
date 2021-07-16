import { DisplayNoneClass } from "../../utils/css";

const ProfileAvailableFor = {
    render: function (el_profile_available_for_wrapper) {
        const html = /*html*/ `
            <div class="ui-group d-block" id="profile_available_for_loading">
                ${this.avaiableForLoadingButton(4)}
            </div>
            <div class="ui-group d-none" id="profile_available_for">
            </div>
        `;

        el_profile_available_for_wrapper.innerHTML = html;

        return;
    },

    init: async function (data, id) {
        try {
            const profile_id = id;
            const el_profile_available_for = document.getElementById(
                "profile_available_for"
            );
            const el_profile_available_for_loading = document.getElementById(
                "profile_available_for_loading"
            );

            el_profile_available_for_loading.remove();
            el_profile_available_for.classList.remove(DisplayNoneClass);

            data.forEach(item => {
                profile_available_for.innerHTML += this.avaiableForButton(item);
            });

            const el_available_for_buttons = el_profile_available_for.querySelectorAll(
                "button"
            );

            el_available_for_buttons.forEach(button => {
                button.addEventListener("click", e =>
                    this.avaiableForButtonOnClick(e, profile_id)
                );
            });
        } catch (err) { }
    },

    avaiableForButtonOnClick: async function (e, profile_id) {
        console.info(`Profile id: ${profile_id}, Sub category id: ${e.target.getAttribute("data-sub-category-id")}`);
    },

    avaiableForButton: data => {
        const html = /*html*/ `
            <button class="button btn btn-secondary round-btn" id="sub_category_${data.id}" data-sub-category-id="${data.id}" >${data.name}</button>
        `;

        return html;
    },

    avaiableForLoadingButton: (number_of_loading_elements = 5) => {
        const html = /*html*/ `
            <div class="button-group js-radio-button-group sub_category mx-0" data-filter-group="color">
                <div class="filter-button-shine"></div>
            </div>
        `;

        return Array(number_of_loading_elements).fill().map(i => html).join("");
    },

};

export default ProfileAvailableFor;

