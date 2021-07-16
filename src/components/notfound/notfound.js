import { DisplayNoneClass } from "../../utils/css.js";

const NotFound = (message) =>/*html*/ `
    <div class="row">
        <div class="col-md-8 m-auto text-center">
            <img src="./img/not_found.svg" alt="" class="img-fluid" style="max-width:90%;">
            <h1>${message} Not found</h1>
        </div>
    </div>
`;

export {
    NotFound
};