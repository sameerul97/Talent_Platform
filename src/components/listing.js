
const HTML_TEMPLATE = {
    SubCategoryFilterButton: function (category) {
        const template = /*html*/ `
                <button class="button btn btn-secondary round-btn m-1" 
                    data-filter=".${category.filter_name}" data-id=${category.sub_category_id}> ${category.name}
                </button>
            `;

        return template;
    },

    BrandFilterButton: function (brand) {
        const template = /*html*/ `
                <button class="button btn btn-secondary round-btn m-1"  
                    data-filter=".${brand.filter_name}" data-id=${brand.id}> ${brand.name}
                </button>
            `;

        return template;
    },

    ProfileListing: function (crew) {
        const template = /*html*/ `
                <div class="col-sm-12 col-md-6 col-lg-4 ">
                    <div class="grid-item small round red">
                        <div class="directory-container position-relative">
                            ${this.ProfileImage(crew)}
                            <div class="directory-details">
                                ${this.ProfileName(crew)}
                                <a href="#crew/${crew.user_id}">
                                    <button type="button" class="btn btn-secondary square-btn">View Profile</button>
                                </a>
                                <button type="button" class="btn btn-primary round-btn" data-profile-name="${crew.crew_name}" data-profile-id=${crew.user_id} data-bs-toggle="modal" data-bs-target="#modal_add_to_project"><i class="fas fa-plus"></i> Add</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;

        return template;
    },

    ProfileImage: function ({ user_id, profile_image }) {
        return /*html*/ `
                <div id="${user_id}" >
                    <div data-image-shine="true" class="loading crew-listing-shine"></div>
                    <a href="#crew/${user_id}">
                        <img src="${profile_image}" class="img-fluid d-none">
                    </a>
                </div>
            `;
    },

    ProfileName: function ({ user_id, crew_name }) {
        return /*html*/ `
                <a href="#crew/${user_id}">
                    <p class="title">${crew_name}</p>
                </a>
            `;
    },
};



const TestFunction = () => { console.log("AAA") }

export default HTML_TEMPLATE;
export { TestFunction };