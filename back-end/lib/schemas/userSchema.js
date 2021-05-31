class User {
    constructor({ login, password, email, phone, region, parent, isAdmin }) {
        this.login = login;
        this.password = password;
        this.email = email;
        this.phone = phone;
        this.parent = parent ? parent : false;
        this.score = 0;
        this.region = region ? region : '';
        this.isAdmin = isAdmin ? true : false; //testing
    }

    async getParent(collection) {
        try {
            return await collection.findOne({ login: this.parent });
        } catch (err) {
            throw new Error(err);
        }
    }

}

module.exports = User;