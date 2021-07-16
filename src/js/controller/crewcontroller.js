
import { getParams } from "../libs/router";
import { get } from "../libs/request";
import HTML_TEMPLATE from "../../components/listing.js";
import { DisplayNoneClass } from "../../utils/css.js";
import AddToProject from "../../components/modal/addtoproject.js";
import CreateProject from "../../components/modal/createproject.js";

async function CrewsController(categoryid) {
    // const DisplayNoneClass = "d-none";
 
    let url;
    // let crewCategoryId = parseInt(categoryid);
    let crewCategoryId = parseInt(getParams().categoryid);
    let category_name = "";
    let sub_categories = [];
    let crews = [];
    let brands = [];

    /* Holds currently selected filters */
    let selected_sub_category_id = [];
    let selected_brands_id = [];
    let selected_sub_category = [];
    let selected_brands = [];

    /* DOM elements */
    const el_inner_content = document.getElementById("inner-content");
    let el_category_name = document.getElementById("category_name");
    let el_sub_category_filter_buttons = document.getElementById(
        "sub_category_filter_buttons"
    );
    let el_brand_filter_buttons = document.getElementById("brand_filter_buttons");
    let el_crews = document.getElementById("crews");

    /* Modal DOM elements */
    let el_modal_add_to_project_wrapper = document.getElementById("modal_add_to_project_wrapper");
    let el_modal_create_new_project_wrapper = document.getElementById("modal_create_new_project_wrapper");

    /* Loading DOM elements */
    let el_sub_category_filter_buttons_group_loading = document.getElementById(
        "sub_category_filter_buttons_group_loading"
    );
    let el_brand_filter_buttons_group_loading = document.getElementById(
        "brand_filter_buttons_group_loading"
    );
    let el_category_name_loading = document.getElementById(
        "category_name_loading"
    );
    let el_crews_loading = document.getElementById("crews_loading");

    /* Hidden DOM elements, shown once data fetched */
    let el_sub_category_filter_buttons_group = document.getElementById(
        "sub_category_filter_buttons_group"
    );
    let el_brand_filter_buttons_group = document.getElementById(
        "brand_filter_buttons_group"
    );

    const seachCrews = function () {
        // if no filter is selected, search with category_id as param [default]
        if (
            selected_sub_category_id.length === 0 &&
            selected_brands_id.length === 0
        ) {
            get("/crew/search/index.php", {
                category_id: crewCategoryId,
            }).then(data => ShowCrew(data, true))
        } else {
            get(url).then(data => ShowCrew(data, true))
        }
    };

    /* Click Handler for Sub Category Filter button */
    const subCategoryFilterButtonClick = function (e) {
        const thisEl = e.target;

        let sub_category_already_selected = thisEl.classList.contains("is-checked");
        let filterValue = thisEl.getAttribute("data-filter");
        let id = thisEl.getAttribute("data-id");

        if (sub_category_already_selected) {
            thisEl.classList.remove("is-checked");

            selected_sub_category = selected_sub_category.filter(
                (e) => e !== filterValue.split(".")[1]
            );

            selected_sub_category_id =
                selected_sub_category_id.filter((e) => e !== id);
        } else {
            thisEl.classList.add("is-checked");

            selected_sub_category.push(filterValue.split(".")[1]);
            selected_sub_category_id.push(id);
        }

        /* Reset URL before every seach */
        url = "/crew/search/index.php";

        for (var i = 0; i < selected_sub_category.length; ++i) {
            if (url.indexOf("?") === -1) {
                url =
                    url +
                    "?sub_category_id[]=" +
                    selected_sub_category_id[i];
            } else {
                url =
                    url +
                    "&sub_category_id[]=" +
                    selected_sub_category_id[i];
            }
        }

        for (var i = 0; i < selected_brands_id.length; ++i) {
            if (url.indexOf("?") === -1) {
                url =
                    url + "?brands_id[]=" + selected_brands_id[i];
            } else {
                url =
                    url + "&brands_id[]=" + selected_brands_id[i];
            }
        }

        seachCrews();
    };

    /* Click Handler for Brand Filter button */
    const brandFilterButtonClick = function (e) {
        const thisEl = e.target;

        let sub_category_already_selected = thisEl.classList.contains("is-checked");
        let filterValue = thisEl.getAttribute("data-filter");
        let id = thisEl.getAttribute("data-id");

        if (sub_category_already_selected) {
            thisEl.classList.remove("is-checked");

            selected_brands = selected_brands.filter(
                (e) => e !== filterValue.split(".")[1]
            );

            selected_brands_id =
                selected_brands_id.filter((e) => e !== id);
        } else {
            thisEl.classList.add("is-checked");

            selected_brands.push(filterValue.split(".")[1]);
            selected_brands_id.push(id);
        }

        /* Reset URL before every seach */
        url = "/crew/search/index.php";

        for (var i = 0; i < selected_sub_category.length; ++i) {
            if (url.indexOf("?") === -1) {
                url =
                    url +
                    "?sub_category_id[]=" +
                    selected_sub_category_id[i];
            } else {
                url =
                    url +
                    "&sub_category_id[]=" +
                    selected_sub_category_id[i];
            }
        }

        for (var i = 0; i < selected_brands_id.length; ++i) {
            if (url.indexOf("?") === -1) {
                url =
                    url + "?brands_id[]=" + selected_brands_id[i];
            } else {
                url =
                    url + "&brands_id[]=" + selected_brands_id[i];
            }
        }

        if (
            selected_sub_category_id.length === 0 &&
            selected_brands_id.length > 0
        ) {
            url =
                url + "&category_id[]=" + crewCategoryId;
        }

        seachCrews();
    };

    const ShowCategoryName = function (data) {
        let categoryName = data.find(function (i) {
            return parseInt(i.Category_id) === crewCategoryId;
        });

        el_category_name_loading.remove();
        el_category_name.classList.remove(DisplayNoneClass);

        el_category_name.innerHTML = categoryName.name;
    };

    const ShowSubCategoryFilterButton = function (data) {
        sub_categories = data;

        el_sub_category_filter_buttons_group_loading.remove();
        el_sub_category_filter_buttons_group.classList.remove(DisplayNoneClass);

        sub_categories.forEach(category => {
            el_sub_category_filter_buttons.innerHTML += HTML_TEMPLATE.SubCategoryFilterButton(
                category
            );
        });

        /* Iterate over all childNodes and register Onclick event for each button */
        el_sub_category_filter_buttons.childNodes.forEach(button => {
            button.onclick = subCategoryFilterButtonClick;
        });
    };

    const ShowBrandFilterButton = function (data) {
        brands = data;

        el_brand_filter_buttons_group_loading.remove();
        el_brand_filter_buttons_group.classList.remove(DisplayNoneClass);

        brands.forEach(category => {
            el_brand_filter_buttons.innerHTML += HTML_TEMPLATE.BrandFilterButton(
                category
            );
        });

        /* Iterate over all childNodes and register Onclick event for each button */
        el_brand_filter_buttons.childNodes.forEach(button => {
            button.onclick = brandFilterButtonClick;
        });
    };

    const ShowCrew = function (data, crew_search = false) {
        crews = data;

        el_crews.classList.remove(DisplayNoneClass);
        el_crews_loading.remove();

        if (crew_search) {
            el_crews.replaceChildren();
            crews.forEach(crew => {
                el_crews.innerHTML += HTML_TEMPLATE.ProfileListing(crew);
            });
        } else {
            crews.forEach(crew => {
                el_crews.innerHTML += HTML_TEMPLATE.ProfileListing(crew);
            });

        }

        crews.forEach(({ user_id }) => {
            const this_listing = document.getElementById(user_id);
            const this_listing_shine = this_listing.querySelector(`[data-image-shine=true]`);
            const this_listing_image = this_listing.querySelector(`img`);

            /* initate onload callback to remove the temporary shine placeholder */
            this_listing_image.onload = () => {
                this_listing_shine.remove();
                this_listing_image.classList.remove(DisplayNoneClass);
            }

            this_listing_image.onerror = () => {
                // TODO: Show temporary image ?
                console.error(`Image not found ${user_id}`)
            }
        });
    };

    /* Fetch required data */
    try {
        const is_crew = true;

        AddToProject.render(el_modal_add_to_project_wrapper);
        AddToProject.init(is_crew);
        CreateProject.render(el_modal_create_new_project_wrapper);
        CreateProject.init(is_crew);

        const data = await get("/getsubcategory/index.php", {
            category: crewCategoryId,
        });

        if (data.error) {
            el_inner_content.innerHTML = NotFound("Category");
            return;
        }

        ShowSubCategoryFilterButton(data)

        await Promise.all([
            get("/getcategory/index.php").then(data => ShowCategoryName(data)),
            get("/crew/search/index.php", {
                category_id: crewCategoryId,
            }).then(data => ShowCrew(data)),
            get("/getbrands/index.php").then(data => ShowBrandFilterButton(data)),
        ]);

    } catch (err) {
        // TODO: Show error message in UI
        console.log(err);
    }
}

// window.CrewsController = CrewsController;


export default CrewsController;