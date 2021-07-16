import { DisplayNoneClass } from "../../utils/css";

const ProfileGalleryImages = {
    store: [],
    el_gallery_images: undefined,
    image_links: ".gallery-link",

    render: function (el_profile_gallery_wrapper) {
        const html = /*html*/`
            <div id="gallery_images_loading">
                ${this.imagesLoading()}
            </div>
            <div id="gallery_images">
            </div>
            <div id="gallery_messages">
            </div>
            <!-- <div>
                <button id="addNewImages" class="button btn btn-secondary round-btn">Add</button>
            </div> -->
            ${this.photoSwiperControls()}
        `;

        el_profile_gallery_wrapper.innerHTML += html;

        return;
    },

    init: async function (data, crew_id) {
        try {
            this.el_gallery_images = document.getElementById("gallery_images");

            const el_gallery_images_loading = document.getElementById("gallery_images_loading")
            const el_gallery_messages = document.getElementById("gallery_messages");
            const el_add_new_images_button = document.getElementById("addNewImages");

            if (data.length === 0) {
                el_gallery_images_loading.remove();
                el_gallery_messages.innerHTML = this.noImages();
            }

            if (data.length > 0) {
                this.store = await this.getPhotoSwipeData(data);

                el_gallery_images_loading.remove();
                await this.renderPhotoSwipe();
                await this.initPhotoSwipe();
            }

            el_add_new_images_button.onclick = async () => {
                var ref = this.store[Math.floor(Math.random() * this.store.length)];

                this.store.push(ref);

                while (this.el_gallery_images.firstChild) {
                    this.el_gallery_images.removeChild(this.el_gallery_images.firstChild);
                }

                await this.renderPhotoSwipe()
                await this.initPhotoSwipe();
            }
        } catch (error) {

        }
    },

    renderPhotoSwipe: async function (el_gallery_images) {
        this.store.forEach(item => {
            this.el_gallery_images.innerHTML += this.image(item);
        });

        return;
    },

    initPhotoSwipe: async function () {
        document.querySelectorAll(this.image_links).forEach(link => {
            link.onclick = (event) => {
                event.preventDefault();

                var _index;

                // const els = this.el_gallery_images.children;
                // for (var i in els) {
                //     if (els[i] === event.currentTarget.parentElement) {
                //         _index = i
                //     }
                // }

                Array.from(this.el_gallery_images.children).forEach((item, index) => {
                    if (item === event.currentTarget.parentElement) _index = index
                })

                var pswp = document.querySelector('.pswp'),
                    options = {
                        // index: $(this).parent('figure').index(),
                        index: parseInt(_index),
                        bgOpacity: 0.85,
                        showHideOpacity: true,
                        history: false,
                        closeOnScroll: true,
                    };

                var gallery = new PhotoSwipe(pswp, PhotoSwipeUI_Default, this.store, options);
                gallery.init();
            }
        })
    },

    getPhotoSwipeData: async (data) => {
        const items = [];

        for (const figure of data) {

            const _load = function (figure) {
                return new Promise(function (resolve, reject) {
                    let img = new Image()

                    img.onload = function () {
                        let width = img.naturalWidth;
                        let height = img.naturalHeight;

                        resolve(items.push({
                            ...figure,
                            w: width,
                            h: height,
                            src: figure.src,
                            // caption: 'figure.querySelector("a").getAttribute("data-caption")' + figure.id,
                            // title: 'figure.querySelector("a").getAttribute("data-caption")' + figure.id,
                        }));
                    }

                    img.onerror = function (err) {
                        console.log(err)
                    }

                    img.src = figure.src
                })
            }

            await _load(figure)
        }

        return items;
    },

    noImages: () => {
        const html = /*html*/ `
            <p>No images</p>
        `
        return html;
    },

    image: (image) => {
        const html = /*html*/ `
            <figure itemprop="associatedMedia" itemscope itemtype="http://schema.org/ImageObject" id="uploaded_image_${image.id}" data-uploaded-image-id="${image.id}">
                <a class="gallery-link" href=${image.src} data-caption="" data-width=${image.w} data-height=${image.h} itemprop="contentUrl">
                    <img src=${image.src} itemprop="thumbnail" alt="Image description">
                </a>
            </figure>
        `

        return html;
    },

    imagesLoading: (number_of_loading_elements = 4) => {
        const html = /*html*/ `
            <div data-image-shine="true" class="loading profile-gallery-image-shine"></div>
        `
        return Array(number_of_loading_elements).fill().map(i => html).join("");
    },

    photoSwiperControls: () => {
        const html = /*html*/ `
            <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="pswp__bg"></div>
                <div class="pswp__scroll-wrap">
                    <div class="pswp__container">
                        <div class="pswp__item"></div>
                        <div class="pswp__item"></div>
                        <div class="pswp__item"></div>
                    </div>
                    <div class="pswp__ui pswp__ui--hidden">
                        <div class="pswp__top-bar">
                            <div class="pswp__counter"></div>
                            <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>
                            <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>
                            <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>

                            <div class="pswp__preloader">
                                <div class="pswp__preloader__icn">
                                    <div class="pswp__preloader__cut">
                                        <div class="pswp__preloader__donut"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                            <div class="pswp__share-tooltip"></div>
                        </div>
                        <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">
                        </button>
                        <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)">
                        </button>
                        <div class="pswp__caption">
                            <div class="pswp__caption__center"></div>
                        </div>
                    </div>
                </div>
            </div>
        `

        return html;
    }
}

export default ProfileGalleryImages;
