const Login = {
    render: async () => {
        const html = /*html*/ `
            <div id="inner-content" class="container">
                <div class="row">
                    <div class="col-md-6 mx-auto">
                        <div class="login-panel panel panel-primary">
                            <div class="panel-heading">
                                <h3 class="panel-title"><span class="glyphicon glyphicon-lock"></span> Login
                                </h3>
                            </div>
                            <div class="panel-body">
                                <form id="loginform">
                                    <fieldset>
                                        <div class="form-group">
                                            <input class="form-control" placeholder="email" name="email" type="text" autofocus required>
                                        </div>
                                        <div class="form-group mt-2">
                                            <input class="form-control" placeholder="Password" name="password" type="password" required>
                                        </div>
                                        <button type="submit" id="loginbutton" class="mt-4 btn btn-lg btn-primary btn-block"><span
                                                class="glyphicon glyphicon-log-in"></span> <span id="logtext">Login</span></button>
                                    </fieldset>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `

        return html;
    }
}

export default Login;