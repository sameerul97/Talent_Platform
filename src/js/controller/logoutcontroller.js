import { DisplayNoneClass } from "../../utils/css.js";
import { get } from "../libs/request";

async function LogOutController() {

    const el_logged_out = document.getElementById("logged_out");
    await get("/logout/index.php");

    el_logged_out.innerHTML = "Logged out successfully";

    setTimeout(() => document.location.hash = "#login", 2500)

}

export default LogOutController;