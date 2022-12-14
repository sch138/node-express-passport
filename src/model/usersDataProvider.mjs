import { FakeRepository } from "./fakeRepository.mjs";

export class UsersDataProvider {
    #users;

    constructor() {
        this.#users = new FakeRepository();
    }

    async createAsync(user) {
        if (this.isValidUser(user)) {
            return await this.#users.createAsync(user)
        }
    }

    isValidUser(user) {
        return !isEmptyString(user.username) && !isEmptyString(user.password);
    }

    async findByIdAsync(id) {
        return (await this.#users.filterAsync(u => u.id == id)).shift();
    }

    async findByNameAsync(username) {
        return (await this.#users.filterAsync(u => u.username == username)).shift();
    }
}

function isEmptyString(str) {
    return !str || str.length === 0
}