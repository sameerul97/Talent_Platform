const Search = {
    render: async () => {
        const html = /*html*/ `
            <div id="inner-content" class="container">
                <div class="row">
                    <div class="filter-button-shine category-name-shine" id="category_name_loading"></div>
                    <h2 id="category_name" class="d-none">Photographers</h2>
        
                    <div class="filters">
                        <div class="col-sm-12">
                            <div class="ui-group d-block" id="sub_category_filter_buttons_group_loading">
                                <p class="heading">Category</p>
                                <div class="button-group js-radio-button-group sub_category" data-filter-group="color">
                                    <div class="filter-button-shine"></div>
                                </div>
                                <div class="button-group js-radio-button-group sub_category" data-filter-group="color">
                                    <div class="filter-button-shine"></div>
                                </div>
                                <div class="button-group js-radio-button-group sub_category" data-filter-group="color">
                                    <div class="filter-button-shine"></div>
                                </div>
                                <div class="button-group js-radio-button-group sub_category" data-filter-group="color">
                                    <div class="filter-button-shine"></div>
                                </div>
                                <div class="button-group js-radio-button-group sub_category" data-filter-group="color">
                                    <div class="filter-button-shine"></div>
                                </div>
                                <div class="button-group js-radio-button-group sub_category" data-filter-group="color">
                                    <div class="filter-button-shine"></div>
                                </div>
                            </div>
        
                            <div class="ui-group d-none" id="sub_category_filter_buttons_group">
                                <p class="heading">Category</p>
        
                                <div class="button-group js-radio-button-group sub_category" id="sub_category_filter_buttons" data-filter-group="color">
                                </div>
                            </div>
                        </div>

                        <div class="col-sm-12">
                            <div class="ui-group d-block" id="brand_filter_buttons_group_loading">
                                <p class="heading">Brand approved</p>
                                <div class="button-group js-radio-button-group sub_category" data-filter-group="color">
                                    <div class="filter-button-shine"></div>
                                </div>
                                <div class="button-group js-radio-button-group sub_category" data-filter-group="color">
                                    <div class="filter-button-shine"></div>
                                </div>
                                <div class="button-group js-radio-button-group sub_category" data-filter-group="color">
                                    <div class="filter-button-shine"></div>
                                </div>
                                <div class="button-group js-radio-button-group sub_category" data-filter-group="color">
                                    <div class="filter-button-shine"></div>
                                </div>
                                <div class="button-group js-radio-button-group sub_category" data-filter-group="color">
                                    <div class="filter-button-shine"></div>
                                </div>
                                <div class="button-group js-radio-button-group sub_category" data-filter-group="color">
                                    <div class="filter-button-shine"></div>
                                </div>
                            </div>

                            <div class="ui-group d-none" id="brand_filter_buttons_group">
                                <p class="heading">Brand approved</p>
                                <div class="button-group js-radio-button-group" data-filter-group="size" id="brand_filter_buttons">
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div class="row mx-0" id="crews_loading">
                    <div class="col-sm-12 col-md-6 col-lg-4 m-auto">
                        <div class="isotope_item_null small round   red ml-0 mr-0 pl-0 pr-0  ">
                            <div class="directory-container">
                                <div class="crews-profile-image-shine position-relative"></div>
                                <div class="directory-details">
                                    <div class="crews-profile-name-shine title"></div>
                                    <div class="crews-view-profile-button-shine  "></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-4 m-auto">
                        <div class="isotope_item_null small round   red ml-0 mr-0 pl-0 pr-0  ">
                            <div class="directory-container">
                                <div class="crews-profile-image-shine position-relative"></div>
                                <div class="directory-details">
                                    <div class="crews-profile-name-shine title"></div>
                                    <div class="crews-view-profile-button-shine  "></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-4 m-auto">
                        <div class="isotope_item_null small round   red ml-0 mr-0 pl-0 pr-0  ">
                            <div class="directory-container">
                                <div class="crews-profile-image-shine position-relative"></div>
                                <div class="directory-details">
                                    <div class="crews-profile-name-shine title"></div>
                                    <div class="crews-view-profile-button-shine  "></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row mx-0 d-none" id="crews">
                </div>

                <!-- Add to Project Modal -->
                <div id="modal_add_to_project_wrapper">
                </div>

                <!-- Add New Project Modal -->
                <div id="modal_create_new_project_wrapper">
                </div>
            </div>

            <script>
                //  CrewsController(<?php echo $_GET["categoryid"]; ?>);
                <!-- CrewsController(12); -->
                //  console.log(Router.params)
            </script>
        `

        return html;
    }
}

export default Search;