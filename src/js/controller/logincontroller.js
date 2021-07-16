import { changeRoute, PubSub } from "../libs/router";
import { post } from "../libs/request";

async function LoginController() {
    const el_login_button = document.getElementById('loginbutton');

    const el_loginform = document.getElementById("loginform");

    el_loginform.addEventListener("submit", async function (e) {

        // TODO: Block Ui submit button until API responds
        e.preventDefault();

        const formData = new FormData(el_loginform);
        const [email, password] = [formData.get('email'), formData.get('password')];

        // TODO: Implement form validation before sending post request
        const response = await post('/login/index.php', {
            email: email,
            password: password
        });

        if (response.error === false) {
            changeRoute("#home", function () {
                PubSub.publish('userLoggedIn', `Data ${new Date()}`);
            });
        }
    });
}

export default LoginController;