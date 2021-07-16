const Home = {
    render: async () => {
        const html = /*html*/ `
            <!-- Page Content Holder -->
            <div id="inner-content">
                <div class="container">
                    <h2>Browse</h2>
                    <p class="heading">select a Sub-Catgory</p>
                    <div class="row">
                        <div class="col-sm-12 col-md-6">
                            <a href="#crew">
                                <div class="cat-pic-container crew-pic">
                                    <h2 class="cat-pic-title cat-pic-title-lg">Crew</h2>
                                <!-- <img src="../img/crew.jpg" class="img-fluid cat-pic"> -->
                                </div>
                            </a>
                        </div>
                        <div class="col-sm-12 col-md-6">
                            <a href="#talent">
                                <div class="cat-pic-container talent-pic">
                                    <h2 class="cat-pic-title cat-pic-title-lg">Talent</h2>
                                <!-- <img src="../img/talent.jpg" class="img-fluid cat-pic"> -->
                                </div>
                            </a>
                        </div>

                    </div>
                </div>
            </div>
            <script>
                console.log("Home html loaded");
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
export default Home;