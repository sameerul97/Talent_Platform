const Project = {
    render: async () => {
        const html = /*html*/ `
             <!-- Page Content Holder -->
            <div id="inner-content">

                <div class="container">
                    <div class="row">

                        <div class="col-sm-12 col-lg-9 col-xl-8" id="project_info_wrapper">
                            <div class="filter-button-shine project-name-shine" id="project_name_loading"></div>
                            <h2></h2>
                            <p class="heading"></p>
                            <!-- <p class="heading">Grazia - 17th June 2021</p> -->
                        </div>
                        <div class="col-xl-4 my-auto" id="project_user_list_wrapper">
                        </div>
                        <div id="project_carousel_wrapper">
                        </div>
                    </div>
                </div>
            </div>


            <!-- Remove from Project Modal -->
            <div class="modal fade" id="delete_from_project" tabindex="-1" aria-labelledby="delete_from_project_label" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="add_to_project_label">Remove from project</h5>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <!-- <div id="user-id"></div> -->
                            <div id="profile-id"></div>
                            <div id="user-message">Are you sure you want to remove [NAME] from this project</div>
                        </div>
                        <div class="modal-footer d-block">
                            <button type="button" class="btn btn-secondary square-btn narrow-btn match-btn d-inline-block" data-bs-dismiss="modal"><i class="fas fa-times-circle"></i> Cancel</button>
                            <button type="button" class="btn btn-success square-btn narrow-btn match-btn float-end" id="delete_from_project_button"><i class="fas fa-check-circle"></i> Done</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Add to Project Modal -->
            <div class="modal fade" id="add_category" tabindex="-1" aria-labelledby="add_category_label" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="add_to_project_label">Add a New Category</h5>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <ul>
                                <li>
                                    <input type="radio" id="video" name="selector">
                                    <label for="video">Video</label>
                                    <div class="check"></div>
                                </li>

                                <li>
                                    <input type="radio" id="photography" name="selector">
                                    <label for="photography">Photography</label>
                                    <div class="check">
                                        <div class="inside"></div>
                                    </div>
                                </li>

                                <li>
                                    <input type="radio" id="styling" name="selector">
                                    <label for="styling">Styling</label>
                                    <div class="check">
                                        <div class="inside"></div>
                                    </div>
                                </li>
                                <li>
                                    <input type="radio" id="crew_and_other" name="selector">
                                    <label for="crew_and_other">Crew & Other</label>
                                    <div class="check"></div>
                                </li>

                                <li>
                                    <input type="radio" id="post_production" name="selector">
                                    <label for="post_production">Post Production</label>
                                    <div class="check">
                                        <div class="inside"></div>
                                    </div>
                                </li>

                                <li>
                                    <input type="radio" id="creative_other" name="selector">
                                    <label for="creative_other">Creative Other</label>
                                    <div class="check">
                                        <div class="inside"></div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class="modal-footer d-block">
                            <button type="button" class="btn btn-secondary square-btn narrow-btn match-btn d-inline-block" data-bs-dismiss="modal"><i class="fas fa-times-circle"></i> Cancel</button>
                            <button type="button" class="btn btn-success square-btn narrow-btn match-btn float-end"><i class="fas fa-check-circle"></i> Done</button>
                        </div>
                    </div>
                </div>
            </div>
        `

        return html;
    }
}

export default Project;