const Profile = {
    render: async () => {
        const html = /*html*/ `
             <!-- Page Content Holder -->
            <div id="inner-content">
                <div class="container">
                    <div class="row">

                        <div class="col-sm-12 col-lg-4 col-xl-4 text-center text-lg-start " id="profile_data_wrapper">
                        </div>

                        <div class="col-sm-12 col-lg-3 col-xl-3  text-center text-lg-start ">
                            <div class="add-edit-container">
                                <div id="add_to_project_button_wrapper">
                                    <button type="button" id="add_to_project_button" class="d-inline-block btn btn-primary square-btn narrow-btn" data-bs-toggle="modal"  data-bs-target="#modal_add_to_project"><i class="fas fa-plus-circle"></i> Add to project</button>
                                </div>
                                <a href="suggest-edit.php" class="edit-link" data-bs-toggle="modal" data-bs-target="#suggest_edits">Suggest Edit</a>
                            </div>
                        </div>

                        <div class="col-lg-5 col-xl-5" id="profile_agency_wrapper">

                        </div>
                    </div>

                    <div class="row">
                        <div class="col-sm-12">
                            <p class="heading">Available for:</p>
                            <div class="available-for" id="profile_available_for_wrapper">

                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-sm-12">
                            <div class="d-inline-block " id="profile_budget_and_location_wrapper">

                            </div>

                            <div class="d-inline-block detail-block" id="profile_approved_for_wrapper">

                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-sm-12 col-lg-8" id="profile_info_wrapper">

                        </div>
                    </div>

                    <div class="row">
                        <div class="col-sm-10 col-sm-offset-1">
                            <!-- Galley wrapper that contains all items -->
                            <div id="gallery" class="gallery" itemscope itemtype="http://schema.org/ImageGallery">

                            </div>
                        </div>
                    </div>






                    <!-- Add to Project Modal -->
                    <div id="modal_add_to_project_wrapper">

                    </div>
                    <!-- Add New Project Modal -->
                    <div id="modal_create_new_project_wrapper">

                    </div>
                </div>
            </div>
        `

        return html;
    }
}

export default Profile;