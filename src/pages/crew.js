const Crew = {
    render: async () => {
        const html = /*html*/ `
            <!-- Page Content Holder -->
            <div id="inner-content">

                <div class="container">
                    <h2>Browse/Crew</h2>
                    <p class="heading">Select a Sub-Catgory</p>

                    <div class="row">
                        <div class="col-sm-12 col-md-6 col-lg-6">
                            <a href="#crew/category/2">
                                <div class="cat-pic-container photo-pic">
                                    <h2 class="cat-pic-title cat-pic-title-sm">Photography</h2>
                                </div>
                            </a>
                        </div>

                        <div class="col-sm-12 col-md-6 col-lg-6">
                            <a href="#crew/category/1">
                                <div class="cat-pic-container video-pic">
                                    <h2 class="cat-pic-title cat-pic-title-sm">Video</h2>
                                </div>
                            </a>
                        </div>

                        <div class="col-sm-12 col-md-6 col-lg-6">
                            <a href="#crew/category/3">
                                <div class="cat-pic-container styling-pic">
                                    <h2 class="cat-pic-title cat-pic-title-sm">Styling</h2>
                                </div>
                            </a>
                        </div>

                        <div class="col-sm-12 col-md-6 col-lg-6 text-center">
                            <a href="#crew/category/4">
                                <div class="cat-pic-container crew-tech-hire-pic">
                                    <h2 class="cat-pic-title cat-pic-title-sm">Post Production</h2>
                                </div>
                            </a>
                        </div>

                        <div class="col-sm-12 col-md-6 col-lg-6">
                            <a href="#crew/category/5">
                                <div class="cat-pic-container crew-tech-hire-pic">
                                    <h2 class="cat-pic-title cat-pic-title-sm">Crew/Tech/Hire</h2>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <script>
                console.log("Crew html loaded");
            </script>
        `

        return html;
    },

    // init: ()=>{
    //     const html = /*html*/ `
    //         <script>
    //             console.log("Crew html loaded");
    //         </script>
    //     `

    //     return html;
    // }
}
export default Crew;