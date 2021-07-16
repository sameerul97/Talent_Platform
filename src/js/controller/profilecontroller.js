
// import { ProfileCategory } from "../../components/profile.js";
import { DisplayNoneClass } from "../../utils/css.js";

import { getParams } from "../libs/router";
import { get } from "../libs/request";
import HTML_TEMPLATE from "../../components/listing.js";

import AddToProject from "../../components/modal/addtoproject.js";
import CreateProject from "../../components/modal/createproject.js";

import ProfileInfo from "../../components/profile/profileinfo.js";
import ProfileName from "../../components/profile/profilename.js";
import ProfileImage from "../../components/profile/profileImage.js";
import ProfileAgency from "../../components/profile/profileagency.js";
import ProfileCategory from "../../components/profile/profileCategory.js";
import ProfileApprovedFor from "../../components/profile/profileapprovedfor.js";
import ProfileAvailableFor from "../../components/profile/profileavaiablefor.js";
import ProfileGalleryImages from "../../components/profile/profilegalleryimages.js";
import ProfileBudgetAndLocation from "../../components/profile/profilebugetandlocation.js";
import { NotFound } from "../../components/notfound/notfound.js";

// async function ProfileController({ id }) {
async function ProfileController() {
    // const DisplayNoneClass = "d-none";
    // const id = Router.params.id;
    const id = parseInt(getParams().id);
    /* DOM elements */
    const el_inner_content = document.getElementById("inner-content");
    const el_profile_data_wrapper = document.getElementById("profile_data_wrapper");
    const el_profile_available_for_wrapper = document.getElementById("profile_available_for_wrapper");
    const el_profile_gallery_wrapper = document.getElementById("gallery");
    const el_profile_budget_and_location_wrapper = document.getElementById("profile_budget_and_location_wrapper");
    const el_profile_approved_for_wrapper = document.getElementById("profile_approved_for_wrapper");
    const el_profile_agency_wrapper = document.getElementById("profile_agency_wrapper");
    const el_profile_info_wrapper = document.getElementById("profile_info_wrapper");
    const el_modal_add_to_project_wrapper = document.getElementById("modal_add_to_project_wrapper");
    const el_modal_crete_new_project_wrapper = document.getElementById("modal_create_new_project_wrapper");
    const el_add_to_project_button = document.getElementById("add_to_project_button");

    el_add_to_project_button.setAttribute("data-profile-id", id);

    let el_profile_name;
    let el_profile_category_name;

    /* Loading DOM elements */
    let el_profile_name_loading;
    let el_profile_category_name_loading;

    let crew_id = id;
    let crew_name = "";
    let profile_image = "";
    let testVar = "Talent";
    let crew_category_name = "";
    let tags = "";
    let brands_approved_for = "";
    let min_rate = "";
    let crew_category_id = "";
    let crew_brands_approved_for = "";
    let crew_location = "";
    let crew_info = "";
    let crew_min_rate = "";
    let crew_max_rate = "";
    let crew_agency_name = "";
    let crew_agency_phone_number = "";
    let crew_agency_email = "";
    let crew_agency_contact_name = "";
    let crew_agency_website = "";
    let crew_uploaded_images = [];

    const collectDomElements = () => {
        el_profile_name = document.getElementById("profile_name");
        el_profile_category_name = document.getElementById("profile_category_name");

        /* Loading DOM elements */
        el_profile_name_loading = document.getElementById("profile_name_loading");
        el_profile_category_name_loading = document.getElementById("profile_category_name_loading")
    }

    const ShowProfileName = (data) => {
        el_profile_name = document.getElementById("profile_name");
        el_profile_name_loading = document.getElementById("profile_name_loading");

        crew_name = data.crew_name;

        el_profile_name_loading.remove();
        el_profile_name.classList.remove(DisplayNoneClass);

        el_profile_name.innerHTML = crew_name;
        el_profile_name.onclick = function () { };
    };

    /* Fetch required data */
    try {
        const is_crew = true;

        AddToProject.render(el_modal_add_to_project_wrapper);
        AddToProject.init(is_crew);
        CreateProject.render(el_modal_crete_new_project_wrapper);
        CreateProject.init(is_crew);

        // await Promise.all([
        ProfileImage.render(el_profile_data_wrapper)
        ProfileName.render(el_profile_data_wrapper)
        ProfileCategory.render(el_profile_data_wrapper)
        ProfileAvailableFor.render(el_profile_available_for_wrapper)
        ProfileGalleryImages.render(el_profile_gallery_wrapper);
        ProfileBudgetAndLocation.render(el_profile_budget_and_location_wrapper);
        ProfileApprovedFor.render(el_profile_approved_for_wrapper);
        ProfileAgency.render(el_profile_agency_wrapper);
        ProfileInfo.render(el_profile_info_wrapper);
        // ]);

        const [brands_approved_for, uploaded_images, profile] = await Promise.all([
            get("/crew/brand/index.php", {
                crew_id: crew_id,
            }).then(data => (data)),
            get("/crew/uploaded_images/index.php", {
                crew_id: crew_id,
            }).then(data => (data)),

            get("/crew/index.php", {
                crew_id: crew_id,
            }).then(function (data) { return data; })
        ]);

        if (profile.error) {
            el_inner_content.innerHTML = NotFound("Crew");
            return;
        }

        ProfileName.init(profile.crew_name, crew_id);
        ProfileImage.init(profile.profile_image, crew_id);
        ProfileInfo.init(profile.info, crew_id);

        crew_category_id = profile.Category_id

        await Promise.all([
            get("/getcategory/index.php", {})
                .then(function (data) {
                    let categoryName = data.find(function (i) {
                        return i.Category_id === crew_category_id;
                    });

                    crew_category_name = categoryName.name;
                }),
            get("/crew/subcategory/index.php", { crew_id: crew_id },).then((data) => (tags = data))
        ]);

        // console.log(profile)

        ProfileCategory.init(crew_category_name);
        ProfileAvailableFor.init(tags, crew_id);
        ProfileGalleryImages.init(uploaded_images, crew_id);

        ProfileBudgetAndLocation.init({
            min_rate: profile.min_rate,
            max_rate: profile.max_rate,
            location: profile.location
        }, crew_id);

        ProfileApprovedFor.init(brands_approved_for, crew_id);

        ProfileAgency.init({
            agency_contact_name: profile.agency_contact_name,
            agency_email: profile.agency_email,
            agency_name: profile.agency_name,
            agency_phone_number: profile.agency_phone_number,
            agency_website: profile.agency_website,
            website_link: profile.website_link,
            phone_number: profile.phone_number,
        }, crew_id);
    } catch (err) {
        // TODO: Show error message in UI
        console.log(err);
    }
}

// window.ProfileController = ProfileController;

export default ProfileController;