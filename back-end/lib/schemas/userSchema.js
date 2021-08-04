class User {
    constructor({ fullName, login, password, email, phone, region, parent, isAdmin }) {
        this.fullName = fullName;
        this.login = login;
        this.password = password;
        this.email = email;
        this.phone = phone;
        this.parent = parent ?? false;
        this.score = 0;
        this.status = 'Потребитель BL';
        this.activeStage = 1;
        this.goal = 0;
        this.region = region ?? '';
        this.date = new Date();
        this.isAdmin = isAdmin ? true : false; //testing
    }

    async getParent(collection) {
        try {
            return await collection.findOne({ login: this.parent }, {
                projection: {
                    password: 0
                }
            });
        } catch (err) {
            throw new Error(err);
        }
    }

    async countPoints(collection) {
        try {

        } catch (err) {
            throw new Error(err);
        }
    }

}

module.exports = User;