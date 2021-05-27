class User {
    constructor({ login, password, role }) {
        this.login = login;
        this.password = password;
        this.role = role ? role : 'member';
    }
}

module.exports = User;