module.exports = class Usuario {
    constructor(username, email, password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    username() {
        return this.username
    }

    email() {
    return this.email
    }

}

