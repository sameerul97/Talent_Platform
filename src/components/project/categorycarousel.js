import { DisplayBlockClass, DisplayNoneClass } from "../../utils/css";
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel';

const CategoryCarousel = {
    render: async function (el_project_carousel_wrapper, el_project_carousel_wrapper_id, category_name) {
        const html = /*html*/ `
            <div class="col-sm-12 col-lg-12 col-xl-12" id="${el_project_carousel_wrapper_id}">
                <div class="owl-container">
                    <div class="crew-talent-title">
                        <h4>${category_name}</h4>
                    </div>
                    <div class="item-carousel">
                        <div class="owl-carousel">
                        </div>
                        <div class="owl-carousel-loading">
                            <div class="row">
                                <!--  <div class="col-md-3 mx-auto text-center py-3">
                                    <div id="profile_image_wrapper" style="line-height: 0;" class="my-3">
                                        <div data-image-shine="true" class="loading shine project-profile-shine"></div>
                                        <img src="" class="img-fluid profile-pic d-none mb-3">
                                    </div>
                                    <div class="filter-button-shine profile-category-name-shine mb-4" id="profile_category_name_loading"></div>
                                    <div class=" shine profile-name-shine" id="profile_name_loading"></div>
                                </div>-->
                                  ${await this.carouselLoading()}  
                            </div>
                        </div>
                        <div class="customNavigation"> <a class="btn prev"><img src="img/prev.svg"></a> <a
                                class="btn next"><img src="img/next.svg"></a> 
                        </div>
                    </div>
                </div>
            </div>
        `

        el_project_carousel_wrapper.innerHTML += html;
        return;
    },

    init: async function (carousel_container_id, category_name, data, category_id, project_id, is_crew, el_modal_delete_from_project_reference) {
        try {
            // const [category_id, project_id] = [category_id, project_id];
            const el_carousel_container = document.querySelector(`#${carousel_container_id}`);

            if (el_carousel_container !== null) {

                const el_carousel_items = el_carousel_container.querySelector(".owl-carousel");
                const el_carousel_next = el_carousel_container.querySelector(".next");
                const el_carousel_prev = el_carousel_container.querySelector(".prev");

                // Delete from Project modal  [Project.php]
                const el_modal_delete_from_project = document.getElementById("delete_from_project");

                for (const i in data) {
                    el_carousel_items.innerHTML += this.carouselSlide(data[i], category_id, project_id, is_crew)
                }

                el_carousel_container.querySelector(".owl-carousel-loading").remove();

                const this_carousel_slides = el_carousel_items.querySelectorAll(".item");

                // console.log(this_carousel_slides);

                // this_carousel_slides.forEach(slide => {
                //     // console.log(slide.querySelector("#carousel_slide_delete_from_project_button"))
                //     slide.querySelector("#carousel_slide_delete_from_project_button").onclick = (e) => {
                //         console.log(e.target);
                //         el_modal_delete_from_project_reference.show();
                //     }
                // });
                // setTimeout(() => el_carousel_container.remove(), 3500)

                $(el_carousel_items).on('initialized.owl.carousel resized.owl.carousel', function (e) {
                    $(e.target).closest('.item-carousel').find('.customNavigation').toggleClass(
                        'hide-nav', e.item.count <= e.page.size);
                });

                // FIXME: Migrate to tiny slider from Owlcarousel
                $(el_carousel_items).owlCarousel({
                    margin: 0,
                    touchDrag: true,
                    dots: true,
                    loop: false,
                    autoplay: false,
                    autoplayTimeout: 3600,
                    autoplayHoverPause: true,
                    responsive: {
                        0: {
                            items: 1,
                            slideBy: 1,
                        },
                        576: {
                            items: 1,
                            slideBy: 1,
                        },
                        768: {
                            items: 2,
                            slideBy: 2,
                        },
                        992: {
                            items: 3,
                            slideBy: 3,
                        },
                        1200: {
                            items: 4,
                            slideBy: 4,
                        },
                    }
                });

                $(el_carousel_next).click(function () {
                    $(this).closest('.item-carousel').find('.owl-carousel').trigger('next.owl.carousel');
                })

                $(el_carousel_prev).click(function () {
                    $(this).closest('.item-carousel').find('.owl-carousel').trigger('prev.owl.carousel');
                });

                // TODO: Show quote price on carousel slide if quote price is already given


                // el_carousel_container.querySelector("#delete_from_project").addEventListener('show.bs.modal', (event) => {

                //     var xButton = $(event.relatedTarget) // Button that triggered the modal
                //     var recipient = xButton.data('id') // Extract info from data-* attributes
                //     var modal = $(this);

                //     const profile_name = xButton.data('profile-name');
                //     // console.log(xButton.data('profile-id'), xButton.data('profile-name'));
                //     console.log(`Project Id: ${project_id}, this carousel category id: ${category_id}`)
                //     modal.find('.modal-body #user-id').attr('id', recipient);
                //     modal.find('.modal-body #user-id').text('Are you sure you want to remove ' + profile_name +
                //         ' from this project');
                // });

                // $(document).on('show.bs.modal', '#delete_from_project', function(event) {

                //     var xButton = $(event.relatedTarget) // Button that triggered the modal
                //     var recipient = xButton.data('id') // Extract info from data-* attributes
                //     var modal = $(this);

                //     const profile_name = xButton.data('profile-name');
                //     // console.log(xButton.data('profile-id'), xButton.data('profile-name'));
                //     console.log(category_id, project_id)
                //     modal.find('.modal-body #user-id').attr('id', recipient);
                //     modal.find('.modal-body #user-id').text('Are you sure you want to remove ' + profile_name +
                //         ' from this project');
                // });

                // $(".quote-container").hide();

                el_carousel_container.querySelectorAll(".project_profile_image_wrapper").forEach((img) => {
                    const this_listing_shine = img.querySelector(`[data-image-shine=true]`);
                    const this_listing_image = img.querySelector(`img`);

                    /* initate onload callback to remove the temporary shine placeholder */
                    this_listing_image.onload = () => {
                        this_listing_shine.remove();
                        this_listing_image.classList.remove(DisplayNoneClass);
                    }

                    this_listing_image.onerror = () => {
                        // TODO: Show temporary image ?
                        console.error(`Image not found ${img}`)
                    }
                });

                el_carousel_container.querySelectorAll(".status").forEach(statusEl => {
                    statusEl.addEventListener("change", async (e) => {
                        const el_status = e.target;
                        const status = el_status.querySelector("option:checked").value;
                        const el_quote_container = el_status.parentNode.querySelector(".quote-container");

                        const el_slide = el_status.parentNode.parentNode;
                        const el_slide_loading = el_slide.querySelector("#loading");

                        const profile_id = el_status.getAttribute('data-profile-id');
                        const category_id = el_status.getAttribute('data-category-id');
                        const project_id = el_status.getAttribute('data-project-id');
                        const is_crew = el_status.getAttribute('data-is-crew');

                        if (status === "quote_received" || status === "booked") {
                            const quote_rate = el_status.parentNode.querySelector("#quote_rate").value;

                            el_quote_container.classList.remove(DisplayNoneClass);

                            if (quote_rate !== "" && quote_rate !== null) {
                                el_slide_loading.classList.remove(DisplayNoneClass);

                                await this.updateStatus(profile_id, category_id, project_id, is_crew, status, quote_rate);

                                el_slide_loading.classList.add(DisplayNoneClass);
                            }
                        } else {
                            el_quote_container.classList.add(DisplayNoneClass);
                            el_slide_loading.classList.remove(DisplayNoneClass);

                            await this.updateStatus(profile_id, category_id, project_id, is_crew, status);

                            el_slide_loading.classList.add(DisplayNoneClass)
                        }
                    })

                    statusEl.parentNode.querySelector('.quote-container input[type="checkbox"]').onclick = async (e) => {
                        const el = e.target;
                        const el_dropdown = el.parentNode.parentNode.querySelector(".status");
                        const status = el_dropdown.querySelector("option:checked").value;

                        const el_slide = el.parentNode.parentNode.parentNode;
                        const el_slide_loading = el_slide.querySelector("#loading");

                        const profile_id = el.getAttribute('data-profile-id');
                        const category_id = el.getAttribute('data-category-id');
                        const project_id = el.getAttribute('data-project-id');
                        const is_crew = el.getAttribute('data-is-crew');

                        if (el.classList.contains("quote_inserted")) {
                            el.classList.remove("quote_inserted");

                            const quote_rate = el.parentNode.querySelector("#quote_rate").value;

                            if (quote_rate !== "" && quote_rate !== null) {
                                el_slide_loading.classList.remove(DisplayNoneClass);

                                await this.updateStatus(profile_id, category_id, project_id, is_crew, status, quote_rate);

                                el_slide_loading.classList.add(DisplayNoneClass);
                            }
                        } else {
                            // ignore [quote input closed]
                            el.classList.add("quote_inserted");
                        }
                    }

                })
            }

        } catch (error) {
            console.log(error);
        }

    },

    updateStatus: async function (
        profile_id,
        category_id,
        project_id,
        is_crew,
        status,
        quote = false
    ) {
        const PutBody = {
            crew_id: profile_id,
            category_id: category_id,
            project_id: project_id,
            status: status
        }

        if (quote) PutBody['quote'] = quote;

        if (is_crew) {
            const res = await put("/crew/project/index.php", PutBody)

            if (res) {
                if (res.error) {
                    console.log(res)
                }
            }

            return res;
        } else {
            // Talent /talent/project/index.php [PUT]
        }
    },

    carouselSlide: function (profile, category_id, project_id, is_crew) {
        const profile_link = is_crew ? `#crew/${profile.id}` : `#talent/${profile.id}`;
        const item_id = is_crew ? `carousel_item_crew_category_id_${category_id}_project_id_${project_id}_profile_id_${profile.id}` :
            `talent_category_id_${category_id}_project_id_${project_id}_profile_id_${profile.id}`;

        const html = /*html*/ `
            <div class="item" id=${item_id}>
                ${this.loadingSpinner()}
                <button class="x-btn"  id="carousel_slide_delete_from_project_button"  data-bs-toggle="modal" data-bs-target="#delete_from_project"
                    data-profile-id="${profile.id}" data-profile-name="${profile.name}"
                    data-category-id="${category_id}" data-project-id=${project_id}
                    data-is-crew=${is_crew} data-carousel-item-id=${item_id}>
                    <i class="fas fa-window-close"></i>
                </button>
                ${this.projectProfileImage(profile, profile_link)}
                <h4>${profile.name}</h4>
                <p class="heading">Status</p>
                <div class="styled-select">
                    <select class="status"
                        data-profile-id="${profile.id}" data-category-id="${category_id}"
                        data-project-id=${project_id} data-is-crew=${is_crew} >
                        ${this.dropDownOption(profile)}
                    </select>
                    <div class="select-button">
                        <div class="small-arrow-down"></div>
                    </div>
                    ${this.quoteContainer(profile, project_id, category_id, is_crew)}
                </div>
            </div>
        `

        return html;
    },

    projectProfileImage: ({ profile_image }, profile_link) => {
        const html = /*html*/ `
            <div class="project_profile_image_wrapper" style="line-height: 0;">
                <div data-image-shine="true" class="loading shine project-profile-shine"></div>
                <a href=${profile_link}>
                    <img src="${profile_image}" class="img-fluid profile-pic project-profile d-none d-inline-block">
                </a>
            </div>
        `

        return html;
    },

    dropDownOption: ({ status }) => {
        const html = /*html*/ `
            <option value="shortlisted"  ${status === "shortlisted" ? 'selected' : ""} >Shortlisted</option>
            <option value="quote_requested" ${status === "quote_requested" ? 'selected' : ""} >Quote Requested</option>
            <option value="first_refusal" ${status === "first_refusal" ? 'selected' : ""} >First refusal</option>
            <option value="quote_received" ${status === "quote_received" ? 'selected' : ""} >Quote Received</option>
            <option value="booked" ${status === "booked" ? 'selected' : ""} >Booked</option>
        `

        return html;
    },

    quoteContainer: ({ quote, status, id, }, project_id, category_id, is_crew) => {
        const html = /*html*/ `
            <div class="${quote && status === 'quote_received' || status === "booked" ? "" : 'd-none'} quote-container" id="test">
                <input type="checkbox"
                data-profile-id="${id}" data-category-id="${category_id}"
                data-project-id=${project_id} data-is-crew=${is_crew} />
                <span></span>
                <input id="quote_rate" type="text" placeholder="Add Quote" value="${quote === null ? "" : quote}"  />
            </div>
        `

        return html;
    },

    loadingSpinner: () => {
        const html = /*html*/ `
            <div id="loading" class="spinner-overlay d-none">
                <div>
                    <div class="spinner-grow" style="color:#002887;" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
            </div>
        `

        return html;
    },

    carouselLoading: (number_of_loading_elements = 4) => {
        const html = /*html*/ `
            <div class="col-md-3 mx-auto text-center py-3">
                <div id="profile_image_wrapper" style="line-height: 0;" class="my-3">
                    <div data-image-shine="true" class="loading shine project-profile-shine"></div>
                    <img src="" class="img-fluid profile-pic d-none mb-3">
                </div>
                <div class="filter-button-shine profile-category-name-shine mb-4" id="profile_category_name_loading"></div>
                <div class=" shine profile-name-shine" id="profile_name_loading"></div>
            </div>
        `

        return Array(number_of_loading_elements).fill().map(i => html).join("");
    }
}

export default CategoryCarousel;