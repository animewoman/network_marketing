class User {
    constructor({ login, password, email, parent, isAdmin }) {
        this.login = login;
        this.password = password;
        this.email = email;
        this.parent = parent ? parent : false;
        this.isAdmin = isAdmin ? true : false;
    }
}

module.exports = User;