export class FakeRepository {

    static #fakeDb = [];

    async createAsync(obj) {
        const id = Math.max(FakeRepository.#fakeDb.map(u => u.id)) + 1;
        FakeRepository.#fakeDb.push({ id, ...obj });
        return await Promise.resolve(id);
    }

    async readAsync(id) {
        return await Promise.resolve(FakeRepository.#fakeDb.find(u => u.id == id))
    }

    async updateAsync(obj) {
        const user = await this.readAsync(id);
        if (user === undefined) {
            return await Promise.resolve(false);
        }

        const index = FakeRepository.#fakeDb.indexOf(user);
        FakeRepository.#fakeDb[index] = obj;

        return await Promise.resolve(true);
    }

    async deleteAsync(id) {
        FakeRepository.#fakeDb = FakeRepository.#fakeDb.filter(u => u.id != id);
        return await Promise.resolve(true);
    }

    async filterAsync(callback) {
        const result = FakeRepository.#fakeDb.filter(callback);
        return await Promise.resolve(result);
    }
}