const ProfileImage = () =>/*html*/ `
    <div id="23">
        <div data-image-shine="true" class="loading shine"></div>
        <img src="user-images/ph2.jpg" class="img-fluid d-none">
    </div>
`;

const ProfileName = () =>/*html*/ `
    <div class="filter-button-shine profile-name-shine" id="profile_name_loading"></div>
    <h2 id="profile_name" class="d-none">Jonny Storey</h2>
`;

const ProfileCategory = () =>/*html*/ `
    <div class="filter-button-shine profile-category-name-shine" id="profile_category_name_loading"></div>
    <p id="profile_category_name" class="heading black d-none">Photographer</p>
`;

export {
    ProfileImage,
    ProfileName,
    ProfileCategory
};